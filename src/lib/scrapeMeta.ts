// lib/scrapeMeta.ts
import { load } from 'cheerio'

export const scrapeMeta = async (url: string) => {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = load(html)

    // OpenGraph 태그 추출
    const ogTitle = $('meta[property="og:title"]').attr('content')
    const ogDescription = $('meta[property="og:description"]').attr('content')
    const ogImage = $('meta[property="og:image"]').attr('content')

    return {
      title: ogTitle || 'No Title',
      description: ogDescription || 'No Description',
      image: ogImage || null,
    }
  } catch (error) {
    console.error('Error scraping meta tags:', error)
    return null
  }
}
