// PostNavigationButton.tsx
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

interface PostNavigationButtonProps {
  postId: number
}

const PostNavigationButton: React.FC<PostNavigationButtonProps> = ({
  postId,
}) => {
  const router = useRouter()

  return (
    <Button
      type='primary'
      className='w-full'
      onClick={() => router.push(`/accompany/${postId}`)}
    >
      모집 게시글로 이동
    </Button>
  )
}

export default PostNavigationButton
