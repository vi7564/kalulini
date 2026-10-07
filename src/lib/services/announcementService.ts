import { Announcement } from '@/types';
import { INITIAL_ANNOUNCEMENTS } from '@/lib/mockData';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore';

let memoryAnnouncements: Announcement[] = [...INITIAL_ANNOUNCEMENTS];

export const announcementService = {
  async getAnnouncements(): Promise<Announcement[]> {
    if (!db) return memoryAnnouncements;

    const role = (await auth?.currentUser?.getIdTokenResult())?.claims.role;
    const announcements = collection(db, 'announcements');
    const snapshot = role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'PRINCIPAL'
      ? await getDocs(announcements)
      : await getDocs(query(announcements, where('published', '==', true)));
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as Announcement);
  },

  async getTopBannerAnnouncement(): Promise<Announcement | undefined> {
    const list = await this.getAnnouncements();
    return list.find((a) => a.isTopBanner && a.published);
  },

  async addAnnouncement(item: Omit<Announcement, 'id'>): Promise<Announcement> {
    const newId = 'ann-' + Date.now();
    const newAnn: Announcement = { ...item, id: newId };

    if (db) {
      const docRef = await addDoc(collection(db, 'announcements'), item);
      newAnn.id = docRef.id;
    }

    memoryAnnouncements = [newAnn, ...memoryAnnouncements];
    return newAnn;
  },

  async updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<Announcement | null> {
    if (db) await updateDoc(doc(db, 'announcements', id), updates);

    const idx = memoryAnnouncements.findIndex((a) => a.id === id);
    if (idx !== -1) {
      memoryAnnouncements[idx] = { ...memoryAnnouncements[idx], ...updates };
      return memoryAnnouncements[idx];
    }
    return null;
  },

  async deleteAnnouncement(id: string): Promise<boolean> {
    if (db) await deleteDoc(doc(db, 'announcements', id));

    memoryAnnouncements = memoryAnnouncements.filter((a) => a.id !== id);
    return true;
  }
};
