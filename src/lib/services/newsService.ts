import { BlogPost } from '@/types';
import { BLOG_POSTS_DATA } from '@/lib/mockData';

let memoryNews: BlogPost[] = [...BLOG_POSTS_DATA];

export const newsService = {
  async getAll(): Promise<BlogPost[]> {
    return memoryNews;
  },
  async getBySlug(slug: string): Promise<BlogPost | undefined> {
    return memoryNews.find((p) => p.slug === slug || p.id === slug);
  },
  async add(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...post,
      id: 'blog-' + Date.now()
    };
    memoryNews = [newPost, ...memoryNews];
    return newPost;
  }
};
