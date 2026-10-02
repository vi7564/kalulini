import { PaymentTransaction } from '@/types';
import { SAMPLE_PAYMENTS, INITIAL_STUDENTS } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

let memoryPayments: PaymentTransaction[] = [...SAMPLE_PAYMENTS];

export const feesService = {
  async getPaymentTransactions(): Promise<PaymentTransaction[]> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        if (!querySnapshot.empty) {
          const list: PaymentTransaction[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as PaymentTransaction);
          });
          return list;
        }
      }
    } catch (err) {
      console.warn("Firestore error reading payments:", err);
    }
    return memoryPayments;
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

    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = await addDoc(collection(db, 'payments'), newRecord);
        newRecord.id = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore write skipped:", err);
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
