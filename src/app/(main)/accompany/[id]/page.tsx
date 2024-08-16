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
  // URL 파라미터에서 id를 가져옴
  const { id } = useParams()
  // id를 정수로 변환하여 postId에 저장
  const postId = parseInt(id as string, 10)
  // mock 데이터에서 해당 id와 일치하는 게시글을 찾음
  const post = mockData.find((item) => item.id === postId)
  // 커스텀 메시지 훅을 사용하여 메시지 표시 관리
  const { contextHolder, showSuccess } = useCustomMessage()
  // 동행 상태를 관리하는 상태 값 (예: pending, accepted, reject)
  const [status, setStatus] = useState('')

  // 게시글을 찾을 수 없는 경우 처리
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>
  }

  // 댓글 삭제 버튼 클릭 시 호출되는 핸들러
  const handleDeleteClick = () => {
    showDeleteModal(
      '댓글 삭제',
      '정말 삭제하시겠습니까? 삭제된 댓글은 복구할 수 없습니다.',
      () => showSuccess('댓글이 삭제되었습니다.')
    )
  }

  return (
    <>
      {/* Modal 메시지를 컨트롤하기 위한 contextHolder */}
      {contextHolder}

      {/* 게시글 상세 페이지 콘텐츠 */}
      <div className='w-full p-5 flex flex-col justify-start items-start mb-[80px]'>
        <h1 className='text-lg font-bold text-main mb-1'>동행 게시판</h1>
        <h2 className='text-lg font-semibold mb-3'>{post.title}</h2>

        {/* 프로필 섹션 */}
        <div className='flex items-center mb-1'>
          <ProfileIcon src={post.profile_image_path} size={30} />
          <div className='ml-3'>
            <p className='font-semibold'>{post.nickname}</p>
            <p className='text-sm text-gray-500'>
              {formatCreatedAt(post.created_at)}
            </p>
          </div>
        </div>

        {/* 동행 지역 및 날짜 정보 */}
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

        {/* 게시글 내용 */}
        <div className='text-gray-700 mb-4 whitespace-pre-wrap text-justify'>
          {post.content}
        </div>

        {/* 동행 신청 버튼 (status가 'reject'가 아닐 때만 표시) */}
        {status !== 'reject' && (
          <button
            className='w-full bg-main text-white py-2 px-3 rounded-full text-sm'
            onClick={() => showSuccess('동행 신청이 완료되었습니다.')}
          >
            동행 신청
          </button>
        )}

        {/* 댓글 영역 */}
        <div className='mt-8 w-full'>
          <h2 className='text-lg font-bold mb-4'>댓글</h2>
          <div className='flex items-start mb-4 flex-1'>
            <ProfileIcon src={post.profile_image_path} size={40} />
            <div className='ml-3 w-full '>
              <p className='font-semibold'>{post.nickname}</p>
              <div className='flex justify-between items-center mt-2'>
                <p className='text-sm text-gray-500'>2024.07.24 14:01:29</p>
                <div className='flex gap-2'>
                  {/* 수정 버튼 */}
                  <button className='text-sm text-main'>수정</button>
                  {/* 삭제 버튼 클릭 시 모달 표시 */}
                  <button
                    className='text-sm text-main'
                    onClick={handleDeleteClick}
                  >
                    삭제
                  </button>
                </div>
              </div>
              {/* 댓글 내용 */}
              <p className='text-gray-700 mt-2'>
                댓글입니다.댓글입니다.댓글입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 입력창 */}
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
