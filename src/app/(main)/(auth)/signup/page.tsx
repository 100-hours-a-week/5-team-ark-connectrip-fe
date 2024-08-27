// page.tsx
'use client'

import React, { Suspense } from 'react'
import SignupPage from './signup-form'

export default function HomeWithSuspense() {
  return (
    <Suspense>
      <SignupPage />
    </Suspense>
  )
}
