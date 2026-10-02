import { EventItem, GalleryItem } from '@/types';
import { EVENTS_DATA, GALLERY_ITEMS_DATA } from '@/lib/mockData';

let memoryEvents: EventItem[] = [...EVENTS_DATA];
let memoryGallery: GalleryItem[] = [...GALLERY_ITEMS_DATA];

export const eventsService = {
  async getAll(): Promise<EventItem[]> {
    return memoryEvents;
  },
  async add(item: Omit<EventItem, 'id'>): Promise<EventItem> {
    const newEvent: EventItem = { ...item, id: 'evt-' + Date.now() };
    memoryEvents = [newEvent, ...memoryEvents];
    return newEvent;
  }
};

export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    return memoryGallery;
  },
  async add(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    const newItem: GalleryItem = { ...item, id: 'gal-' + Date.now() };
    memoryGallery = [newItem, ...memoryGallery];
    return newItem;
  }
};
