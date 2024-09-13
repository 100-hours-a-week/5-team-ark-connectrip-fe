// lib/scrapeMeta.ts
import { load } from 'cheerio'
// 메모리 캐시 객체
const cache = new Map<string, { data: any; expires: number }>()

export const scrapeMeta = async (url: string) => {
  // 카카오맵 URL인지 확인 (카카오맵 URL은 썸네일 동일)
  const cacheKey = url.startsWith('https://map.kakao.com/')
    ? 'https://map.kakao.com/'
    : url

  // 캐시된 데이터 확인
  const cached = cache.get(cacheKey)
  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = load(html)

    // OpenGraph 태그 추출
    const ogTitle = $('meta[property="og:title"]').attr('content')
    const ogDescription = $('meta[property="og:description"]').attr('content')
    const ogImage = $('meta[property="og:image"]').attr('content')

    // 스크래핑된 데이터를 객체로 저장
    const scrapedData = {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
    }

    // 캐시에 저장 (1시간 동안 유효)
    cache.set(cacheKey, {
      data: scrapedData,
      expires: Date.now() + 60 * 60 * 1000,
    })

    return scrapedData
  } catch (error) {
    console.error('Error scraping meta tags:', error)
    return null
  }
}
