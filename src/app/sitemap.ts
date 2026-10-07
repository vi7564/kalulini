import type { MetadataRoute } from 'next';

const siteUrl = 'https://kaluliniboys.ac.ke';
const publicPaths = [
  '/',
  '/about',
  '/academics',
  '/academics/kcse',
  '/admissions',
  '/contact',
  '/downloads',
  '/events',
  '/facilities',
  '/faqs',
  '/gallery',
  '/media-center',
  '/news',
  '/sdgs',
  '/student-life',
  '/virtual-tour',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
