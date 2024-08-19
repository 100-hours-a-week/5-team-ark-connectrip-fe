// components/SuspenseWrapper.tsx

import React, { Suspense, ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

type SuspenseWrapperProps = {
  children: ReactNode
}

export default function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
}
