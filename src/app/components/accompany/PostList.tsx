import React from 'react'

interface PostListProps<T> {
  posts: T[]
  onPostClick: (id: number) => void
  PostComponent: React.FC<T>
}

const PostList = <T extends { id: number }>({
  posts,
  onPostClick,
  PostComponent,
}: PostListProps<T>) => {
  return (
    <div className='container mx-auto mt-4 mb-10'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} onClick={() => onPostClick(post.id)}>
            <PostComponent {...post} />
          </div>
        ))
      ) : (
        <div className='flex justify-center items-center h-[300px] text-gray-500 text-base'>
          첫번째 게시글을 작성해보세요!
        </div>
      )}
    </div>
  )
}

export default PostList
