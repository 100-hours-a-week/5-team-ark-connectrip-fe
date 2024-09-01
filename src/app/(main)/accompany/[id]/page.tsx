// components/AccompanyDetailPage.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShareAltOutlined, LeftOutlined } from '@ant-design/icons'
import ProfileIcon from '@/app/components/common/ProfileIcon'
import CalendarIcon from '@/app/components/Icon/CalendarIcon'
import PinIcon from '@/app/components/Icon/PinIcon'
import InfoRow from '@/app/components/accompany/InfoRow'
import { useCustomMessage } from '@/app/utils/alertUtils'
import useShareModal from '@/app/hooks/useShareModal'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import useAuthStore from '@/app/store/useAuthStore'
import { Post, Comment } from '@/interfaces'
import {
  fetchPost,
  fetchComments,
  createComment,
  updateComment,
  deletePost,
  deleteComment,
  fetchPendingStatus,
  applyForAccompany,
  cancelAccompanyApplication,
} from '@/app/utils/fetchUtils' // 유틸리티 함수 import
import { formatToUtcDate } from '@/app/utils/dateUtils'
import { AccompanyStatus, RecruitmentStatus } from '@/types'

export default function AccompanyDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const postId = parseInt(id as string, 10)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')
  // 수정 모드 여부
  const [isEditing, setIsEditing] = useState<boolean>(false)
  // 수정할 댓글 ID
  const [editCommentId, setEditCommentId] = useState<number | null>(null)
  // 동행 신청 상태
  const [pendingStatus, setPendingStatus] = useState<AccompanyStatus>('NONE')
  // 게시글 모집 상태
  const [recruitmentStatus, setRecruitmentStatus] =
    useState<RecruitmentStatus>('PROGRESSING')

  const { userId } = useAuthStore()
  const { contextHolder, showSuccess, showWarning } = useCustomMessage()
  const { openModal, ShareModalComponent } = useShareModal() // 공유 모달 관련 훅 사용
  const handleDeleteClick = useHandleDeleteClick()

  // 게시글 삭제 버튼 클릭 시 호출되는 함수
  const handleDeletePost = () => {
    handleDeleteClick(
      '게시글',
      '/accompany',
      async () => await deletePost(postId)
    )
  }
  // 댓글 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteComment = (commentId: number) => {
    handleDeleteClick('댓글', '', async () => await deleteComment(commentId))
  }

  // 동행 신청 취소 버튼 클릭 시 호출되는 함수
  const handleCancelApplication = () => {
    handleDeleteClick('동행 신청', '', async () => {
      const response = await cancelAccompanyApplication(postId) // 동행 신청 취소 API 호출
      console.log(response)
      setPendingStatus('DEFAULT') // 상태를 NONE으로 변경
      showSuccess('동행 신청이 취소되었습니다.')
    })
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        // 게시글 데이터 fetch
        const postData = await fetchPost(postId)
        setPost(postData)
        setRecruitmentStatus(postData.status)
        // 동행 신청 상태 fetch
        const status = await fetchPendingStatus(postId)
        setPendingStatus(status)

        // 댓글 데이터 fetch
        const fetchedComments = await fetchComments(postId)
        setComments(fetchedComments)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    loadData()
  }, [postId])

  if (!post) {
    return <LoadingSpinner />
  }

  const handleButtonClick = async () => {
    if (recruitmentStatus === 'CLOSED' || recruitmentStatus === 'FINISHED') {
      showWarning('모집이 완료된 게시글입니다.')
    } else if (recruitmentStatus === 'PROGRESSING') {
      try {
        if (pendingStatus === 'PENDING') {
          showWarning('현재 동행 승인 대기 중입니다.')
        } else if (pendingStatus === 'ACCEPTED' || pendingStatus === 'NONE') {
          showSuccess('동행 채팅방으로 입장합니다.')
          router.push(`/chat/${postId}`)
        } else {
          // 동행 신청 API 호출
          const status = await applyForAccompany(postId)
          if (status === 'PENDING') {
            setPendingStatus('PENDING')
            showSuccess('동행 신청이 완료되었습니다.')
          }
        }
      } catch (error) {
        console.error('Failed to apply for accompany:', error)
        showWarning('동행 신청에 실패했습니다.')
      }
    }
  }

  // 댓글 작성 버튼 클릭 시
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return showWarning('댓글을 입력해주세요.')

    try {
      if (isEditing && editCommentId !== null) {
        const response = await updateComment(editCommentId, postId, newComment) // 유틸리티 함수 사용

        if (response) {
          showSuccess('댓글이 수정되었습니다.')
          setIsEditing(false)
          setEditCommentId(null)
        } else {
          showWarning('댓글 수정에 실패했습니다.')
        }
      } else {
        const response = await createComment(postId, newComment) // 유틸리티 함수 사용

        if (response) {
          showSuccess('댓글이 등록되었습니다.')
        } else {
          showWarning('댓글 등록에 실패했습니다.')
        }
      }

      setNewComment('')
      const newCommentData = await fetchComments(postId)
      setComments(newCommentData)
    } catch (error) {
      console.error('댓글 등록/수정 중 오류 발생:', error)
      showWarning('댓글 처리에 실패했습니다.')
    }
  }

  const handleCommentModifyClick = (commentId: number) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId)
    if (commentToEdit) {
      setIsEditing(true)
      setEditCommentId(commentId)
      setNewComment(commentToEdit.content)
    }
  }

  return (
    <>
      {contextHolder}
      {/* 공유 모달에 custom_url과 custom_url_qr_path를 프롭스로 전달 */}
      <ShareModalComponent
        customUrl={post.customUrl}
        customUrlQrPath={post.urlQrPath}
      />

      <div className='w-full p-5 flex flex-col justify-start items-start mb-[80px]'>
        <div className='flex items-center justify-between w-full mb-2'>
          <div
            onClick={() => router.back()}
            className='text-sm cursor-pointer text-secondary hover:text-black'
          >
            <LeftOutlined style={{ fontSize: 16 }} />
          </div>

          <button onClick={openModal} className='cursor-pointer'>
            <ShareAltOutlined />
          </button>
        </div>
        <h2 className='text-lg font-semibold mb-3 break-all'>{post.title}</h2>
        {/* 프로필 섹션 */}
        <div className='flex items-center mb-1 w-full'>
          <ProfileIcon
            src={post.profileImagePath}
            size={40}
            nickname={post.nickname}
          />
          <div className='ml-3 flex-1'>
            <p className='font-semibold'>{post.nickname}</p>
            <p className='text-sm text-gray-500'>{post.createdAt}</p>
          </div>
          {post.memberId.toString() === userId && ( // 게시글 작성자만 수정/삭제 버튼 표시
            <div className='flex gap-4'>
              <button
                onClick={() => router.push(`/accompany/edit/${id}`)}
                className='text-sm text-secondary'
              >
                수정
              </button>
              <button
                className='text-sm text-secondary'
                onClick={handleDeletePost}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        {/* 동행 지역 및 날짜 정보 */}
        <div className='w-full overflow-x-auto no-scrollbar mb-4 mt-2'>
          <div className='flex items-center space-x-3'>
            <div className='flex-shrink-0'>
              <InfoRow
                icon={<PinIcon />}
                text={`동행 지역 : ${post.accompanyArea}`}
                customStyle={true}
              />
            </div>
            {!post.startDate && !post.endDate && (
              <div className='flex-shrink-0'>
                <InfoRow
                  icon={<CalendarIcon />}
                  text={`동행 날짜 : 미정`}
                  customStyle={true}
                />
              </div>
            )}
            {post.startDate && post.endDate && (
              <div className='flex-shrink-0'>
                <InfoRow
                  icon={<CalendarIcon />}
                  text={`동행 날짜 : ${post.startDate} ~ ${post.endDate}`}
                  customStyle={true}
                />
              </div>
            )}
          </div>
        </div>
        <div className='text-gray-700 mb-4 whitespace-pre-wrap text-justify p-1'>
          {post.content}
        </div>
        {recruitmentStatus === 'PROGRESSING' &&
          pendingStatus !== 'REJECTED' && (
            <>
              {pendingStatus === 'EXIT_ROOM' ? (
                <button
                  className='w-full bg-gray-400 text-white py-2 px-3 rounded-full text-sm'
                  onClick={() => showWarning('나가기가 완료된 동행글입니다.')}
                >
                  나가기가 완료된 동행글입니다.
                </button>
              ) : post.memberId.toString() === userId &&
                pendingStatus === 'NONE' &&
                post.memberId !== post.leaderId ? (
                <button
                  className='w-full bg-gray-400 text-white py-2 px-3 rounded-full text-sm'
                  onClick={() => showWarning('나가기가 완료된 동행글입니다.')}
                >
                  나가기가 완료된 동행글입니다.
                </button>
              ) : (
                <>
                  {pendingStatus === 'PENDING' ? (
                    <button
                      className='w-full bg-main text-white py-2 px-3 rounded-full text-sm'
                      onClick={handleCancelApplication} // 신청 취소 버튼 클릭 시 호출
                    >
                      동행 승인 대기 (취소)
                    </button>
                  ) : (
                    <button
                      className='w-full bg-main text-white py-2 px-3 rounded-full text-sm'
                      onClick={handleButtonClick}
                    >
                      {pendingStatus === 'ACCEPTED' || pendingStatus === 'NONE'
                        ? '채팅방으로 이동'
                        : '동행 신청'}
                    </button>
                  )}
                </>
              )}
            </>
          )}

        {recruitmentStatus !== 'PROGRESSING' && (
          <button
            className='w-full bg-gray-400 text-white py-2 px-3 rounded-full text-sm'
            onClick={handleButtonClick}
          >
            모집 마감
          </button>
        )}

        <div className='mt-8 w-full'>
          <h2 className='text-[18px] font-bold mb-4'>댓글</h2>
          {!comments.length && (
            <div className='flex justify-center items-center h-9'>
              <p className='text-gray-700 text-sm'>첫 댓글을 작성해보세요!</p>
            </div>
          )}
          {comments.map((comment) => (
            <div className='flex items-start mb-4 w-full '>
              <ProfileIcon
                src={comment.memberProfileImage}
                size={35}
                nickname={comment.memberNickname}
              />
              <div className='ml-3 flex-1 w-full'>
                <p className='font-semibold'>{comment.memberNickname}</p>
                <div className='flex justify-between items-center '>
                  <p className='text-sm text-gray-500'>
                    {formatToUtcDate(comment.createdAt)}
                  </p>
                  {comment.memberId.toString() === userId && ( // 댓글 작성자만 수정/삭제 버튼 표시
                    <div className='flex gap-4'>
                      <button
                        className='text-sm text-secondary'
                        onClick={() => handleCommentModifyClick(comment.id)}
                      >
                        수정
                      </button>
                      <button
                        className='text-sm text-secondary'
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                <p className='text-gray-700 mt-1'>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='px-4 py-2 fixed w-full max-w-[500px] bg-white bottom-[60px] z-10'>
        <div className='flex items-center'>
          <input
            type='text'
            value={newComment}
            placeholder='댓글을 입력하세요.'
            onChange={(e) => setNewComment(e.target.value)}
            className='flex-1 w-full h-[35px] p-2 px-4 border border-gray-300 rounded-full focus:border-main focus:border-2 outline-none'
          />
          <button
            className='ml-3 h-[35px] bg-main text-white py-0 px-5 rounded-full whitespace-nowrap'
            onClick={handleCommentSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </>
  )
}
