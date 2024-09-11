// app/api/scrape/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { scrapeMeta } from '@/lib/scrapeMeta'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  }

  const metadata = await scrapeMeta(url)
  return NextResponse.json(metadata)
}
