import { fetchBaseUrl } from '@/Constants/urls';
import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
   const baseURL =async ()=> await fetchBaseUrl();
   
  //  console.log("fffffffffff",baseURL)
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/private/', '/_next/'],
      },
      
      
      
    ],
    sitemap: `https://royaldefenceacademy.in/sitemap.xml`,
  }
}