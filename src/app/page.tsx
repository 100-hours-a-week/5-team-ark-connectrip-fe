// page.tsx
'use client'

import React, { Suspense } from 'react'
import Home from './with-search'

export default function HomeWithSuspense() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  )
}
