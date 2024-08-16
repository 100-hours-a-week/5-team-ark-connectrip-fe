'use client'

import { useParams } from 'next/navigation'
import { mockData } from '@/app/data/mockDataPost'
import ProfileIcon from '@/app/components/ProfileIcon'
import { formatShortDate, formatCreatedAt } from '@/app/utils/dateUtils'
import CalendarIcon from '@/app/components/Icon/CalendarIcon'
import PinIcon from '@/app/components/Icon/PinIcon'
import InfoRow from '@/app/components/InfoRow'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { showDeleteModal } from '@/app/utils/modalUtils' // 삭제 모달 유틸 임포트
import { useState } from 'react'

export default function AccompanyDetailPage() {
  const { id } = useParams()
  const postId = parseInt(id as string, 10)
  const post = mockData.find((item) => item.id === postId)
  const { contextHolder, showSuccess } = useCustomMessage()
  const [status, setStatus] = useState('')

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>
  }

  const handleDeleteClick = () => {
    showDeleteModal(
      '댓글 삭제',
      '정말 삭제하시겠습니까? 삭제된 댓글은 복구할 수 없습니다.',
      () => showSuccess('댓글이 삭제되었습니다.')
    )
  }

  return (
    <>
      {contextHolder}
      <div className='w-full p-5 flex flex-col justify-start items-start mb-[80px]'>
        <h1 className='text-lg font-bold text-main mb-1'>동행 게시판</h1>
        <h2 className='text-lg font-semibold mb-3'>{post.title}</h2>
        <div className='flex items-center mb-1'>
          <ProfileIcon src={post.profile_image_path} size={30} />
          <div className='ml-3'>
            <p className='font-semibold'>{post.nickname}</p>
            <p className='text-sm text-gray-500'>
              {formatCreatedAt(post.created_at)}
            </p>
          </div>
        </div>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex mt-2 items-center text-sm text-gray-500 space-x-3'>
            <InfoRow
              icon={<PinIcon />}
              text={`동행 지역 : ${post.accompany_area}`}
              customStyle={true}
            />
            <InfoRow
              icon={<CalendarIcon />}
              text={`동행 날짜 : ${formatShortDate(post.start_date)} ~ ${formatShortDate(post.end_date)}`}
              customStyle={true}
            />
          </div>
        </div>
        <div className='text-gray-700 mb-4 whitespace-pre-wrap text-justify'>
          {post.content}
        </div>

        {status !== 'reject' && (
          <button
            className='w-full bg-main text-white py-2 px-3 rounded-full text-sm'
            onClick={() => showSuccess('동행 신청이 완료되었습니다.')}
          >
            동행 신청
          </button>
        )}

        <div className='mt-8 w-full'>
          <h2 className='text-lg font-bold mb-4'>댓글</h2>
          <div className='flex items-start mb-4 flex-1'>
            <ProfileIcon src={post.profile_image_path} size={40} />
            <div className='ml-3 w-full '>
              <p className='font-semibold'>{post.nickname}</p>
              <div className='flex justify-between items-center mt-2'>
                <p className='text-sm text-gray-500'>2024.07.24 14:01:29</p>
                <div className='flex gap-2'>
                  <button className='text-sm text-main'>수정</button>
                  <button
                    className='text-sm text-main'
                    onClick={handleDeleteClick} // 삭제 클릭 시 커스텀 모달 호출
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className='text-gray-700 mt-2'>
                댓글입니다.댓글입니다.댓글입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='px-4 py-2 fixed  w-full bg-white bottom-[60px] z-10'>
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='댓글을 입력하세요.'
            className='flex-1 h-[35px] p-2 px-4 border border-gray-300 rounded-full focus:border-main focus:border-2 outline-none'
          />
          <button
            className='ml-3 h-[35px] bg-main text-white py-0 px-5 rounded-full'
            onClick={() => showSuccess('댓글이 등록되었습니다.')}
          >
            등록
          </button>
        </div>
      </div>
    </>
  )
}
