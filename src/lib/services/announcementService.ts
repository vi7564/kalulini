import { Announcement } from '@/types';
import { INITIAL_ANNOUNCEMENTS } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

let memoryAnnouncements: Announcement[] = [...INITIAL_ANNOUNCEMENTS];

export const announcementService = {
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const querySnapshot = await getDocs(collection(db, 'announcements'));
        if (!querySnapshot.empty) {
          const list: Announcement[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Announcement);
          });
          return list;
        }
      }
    } catch (err) {
      console.warn("Firestore error reading announcements:", err);
    }
    return memoryAnnouncements;
  },

  async getTopBannerAnnouncement(): Promise<Announcement | undefined> {
    const list = await this.getAnnouncements();
    return list.find((a) => a.isTopBanner && a.published);
  },

  async addAnnouncement(item: Omit<Announcement, 'id'>): Promise<Announcement> {
    const newId = 'ann-' + Date.now();
    const newAnn: Announcement = { ...item, id: newId };

    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = await addDoc(collection(db, 'announcements'), item);
        newAnn.id = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore write skipped:", err);
    }

    memoryAnnouncements = [newAnn, ...memoryAnnouncements];
    return newAnn;
  },

  async updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<Announcement | null> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = doc(db, 'announcements', id);
        await updateDoc(docRef, updates);
      }
    } catch (err) {
      console.warn("Firestore update skipped:", err);
    }

    const idx = memoryAnnouncements.findIndex((a) => a.id === id);
    if (idx !== -1) {
      memoryAnnouncements[idx] = { ...memoryAnnouncements[idx], ...updates };
      return memoryAnnouncements[idx];
    }
    return null;
  },

  async deleteAnnouncement(id: string): Promise<boolean> {
    try {
      if (db && typeof db.app !== 'undefined') {
        await deleteDoc(doc(db, 'announcements', id));
      }
    } catch (err) {
      console.warn("Firestore delete skipped:", err);
    }

    memoryAnnouncements = memoryAnnouncements.filter((a) => a.id !== id);
    return true;
  }
};
