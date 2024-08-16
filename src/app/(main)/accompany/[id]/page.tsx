'use client'

import { useParams } from 'next/navigation'
import { mockData } from '@/app/data/mockDataPost'
import ProfileIcon from '@/app/components/ProfileIcon'
import { formatShortDate, formatCreatedAt } from '@/app/utils/dateUtils'
import CalendarIcon from '@/app/components/Icon/CalendarIcon'
import PinIcon from '@/app/components/Icon/PinIcon'
import InfoRow from '@/app/components/InfoRow' // 새로 만든 컴포넌트 임포트
import { useCustomMessage } from '@/app/utils/alertUtils'

export default function AccompanyDetailPage() {
  const { id } = useParams()
  const postId = parseInt(id as string, 10) // URL에서 가져온 id를 숫자로 변환
  const post = mockData.find((item) => item.id === postId) // 해당 id에 맞는 게시글을 찾음
  const { contextHolder, showSuccess, showError } = useCustomMessage()

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div> // id에 맞는 게시글이 없을 때 처리
  }

  return (
    <>
      {contextHolder}
      <div className='w-full p-5 flex flex-col justify-start items-start  mb-[80px] '>
        <h1 className='text-lg font-bold text-main mb-1'>동행 게시판</h1>
        <h2 className='text-ㅣㅎ font-semibold mb-3'>{post.title}</h2>
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

        <button
          className='w-full bg-main text-white py-2 px-3 rounded-full text-sm'
          onClick={() => showSuccess('동행 참여 신청이 완료되었습니다.')}
        >
          동행 참여
        </button>

        {/* 댓글 영역 */}
        <div className='mt-8'>
          <h2 className='text-lg font-bold mb-4'>댓글</h2>
          <div className='flex items-start mb-4'>
            <ProfileIcon src={post.profile_image_path} size={40} />
            <div className='ml-3'>
              <p className='font-semibold'>{post.nickname}</p>
              <p className='text-sm text-gray-500'>2024.07.24 14:01:29</p>
              <p className='text-gray-700 mt-2'>
                댓글입니다.댓글입니다.댓글입니다.
              </p>
              <div className='flex gap-2 mt-2'>
                <button className='text-sm text-main'>답글</button>
                <button className='text-sm text-main'>수정</button>
                <button className='text-sm text-main'>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-4 py-2 fixed w-full bg-white bottom-[60px] z-10'>
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='댓글을 입력하세요.'
            className='flex-1 h-[35px] p-2 px-4 border border-gray-300 rounded-full focus:border-main focus:border-2  outline-none'
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
