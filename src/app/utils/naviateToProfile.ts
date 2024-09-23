import { useRouter } from 'next/navigation'

type RouterType = ReturnType<typeof useRouter>

export const navigateToProfile = (
  router: RouterType,
  memberId: number,
  userId: string
) => {
  if (memberId.toString() === userId) {
    router.push('/profile')
  } else {
    router.push(`/profile/${memberId}`)
  }
}
