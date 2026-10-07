import { PaymentTransaction } from '@/types';
import { SAMPLE_PAYMENTS, INITIAL_STUDENTS } from '@/lib/mockData';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

let memoryPayments: PaymentTransaction[] = [...SAMPLE_PAYMENTS];

export const feesService = {
  async getPaymentTransactions(): Promise<PaymentTransaction[]> {
    if (!db) return memoryPayments;

    const claims = (await auth?.currentUser?.getIdTokenResult())?.claims;
    if (!claims) throw new Error('Sign in to access payment records.');
    const role = claims?.role;
    const payments = collection(db, 'payments');
    let querySnapshot;

    if (role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'PRINCIPAL') {
      querySnapshot = await getDocs(payments);
    } else if ((role === 'STUDENT' || role === 'PARENT') && typeof claims.studentId === 'string') {
      querySnapshot = await getDocs(query(payments, where('studentId', '==', claims.studentId)));
    } else {
      throw new Error('Your role is not allowed to read payment records.');
    }

    return querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as PaymentTransaction);
  },

  async getPaymentsByStudentId(studentId: string): Promise<PaymentTransaction[]> {
    const all = await this.getPaymentTransactions();
    return all.filter((p) => p.studentId === studentId);
  },

  async recordPayment(paymentData: Omit<PaymentTransaction, 'id' | 'receiptNumber'>): Promise<PaymentTransaction> {
    const receiptNumber = `REC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newId = 'pay-' + Date.now();
    const newRecord: PaymentTransaction = {
      ...paymentData,
      id: newId,
      receiptNumber
    };

    if (db) {
      const docRef = await addDoc(collection(db, 'payments'), newRecord);
      newRecord.id = docRef.id;
    }

    memoryPayments = [newRecord, ...memoryPayments];
    return newRecord;
  },

  async getFeeSummary() {
    // Computes aggregate totals
    const totalCollected = memoryPayments.reduce((acc, curr) => acc + curr.amount, 0);
    const totalPending = INITIAL_STUDENTS.reduce((acc, curr) => acc + curr.feeBalance, 0);
    return {
      totalCollected,
      totalPending,
      paymentCount: memoryPayments.length
    };
  }
};
