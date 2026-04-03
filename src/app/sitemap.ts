import { MetadataRoute } from 'next'
import { getAllPapers } from '@/lib/papers'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://research.speion.com'
  const papers = getAllPapers()

  const paperUrls = papers.map((paper) => ({
    url: `${baseUrl}/papers/${paper.slug}`,
    lastModified: new Date(paper.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/papers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...paperUrls,
  ]
}
