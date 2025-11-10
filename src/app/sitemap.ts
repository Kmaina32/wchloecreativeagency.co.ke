import { MetadataRoute } from 'next';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// Initialize Firebase Admin for server-side operations
// This ensures we only initialize once.
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wchloe.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Get static routes
  const staticRoutes = [
    '',
    '/talent',
    '/blog',
    '/contact',
    '/login',
    '/signup',
    '/talent-match',
    '/complete-profile',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Get dynamic talent routes
  const talentsCollection = collection(db, 'talents');
  const talentQuery = query(talentsCollection, where('approved', '==', true));
  const talentSnapshot = await getDocs(talentQuery);
  const talentRoutes = talentSnapshot.docs.map((doc) => ({
    url: `${siteUrl}/talent/${doc.id}`,
    lastModified: new Date().toISOString(), // Or use a 'updatedAt' field from your doc
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Get dynamic blog post routes
  const blogPostsCollection = collection(db, 'blogPosts');
  const blogSnapshot = await getDocs(blogPostsCollection);
  const blogRoutes = blogSnapshot.docs.map((doc) => ({
    url: `${siteUrl}/blog/${doc.id}`,
    lastModified: new Date().toISOString(), // Or use a 'publishedAt' field
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...talentRoutes, ...blogRoutes];
}
