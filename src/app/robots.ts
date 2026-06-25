import type { MetadataRoute } from 'next';

const DISALLOW_PATHS = [
  '/login',
  '/signup',
  '/reset-password',
  '/articles',
  '/settings',
  '/my-history',
  '/no-team',
  '/addteam',
  '/jointeam',
  '/*/tasklist',
  '/*/edit',
  '/*/editteam',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: DISALLOW_PATHS,
    },
  };
}
