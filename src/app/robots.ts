import { fetchBaseUrl } from '@/Constants/urls';
import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
   const baseURL =  fetchBaseUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/private/', '/_next/'],
      },
      
      
      
    ],
    sitemap: `${baseURL}sitemap.xml`,
  }
}