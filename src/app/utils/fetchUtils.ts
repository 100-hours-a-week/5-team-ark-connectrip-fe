// utils/fetchUtils.ts
import { api } from '@/app/utils/api'
import { formatToUtcDate, formatShortDateFromUtc } from '@/app/utils/dateUtils'
import { Comment } from '@/interfaces/index'

// 게시글 데이터를 가져오는 유틸리티 함수
export const fetchPost = async (postId: number) => {
  try {
    const data = await api.get(`/api/v1/accompany/posts/${postId}`)
    return {
      ...data,
      createdAt: formatToUtcDate(data.createdAt),
      startDate: data.startDate ? formatShortDateFromUtc(data.startDate) : null,
      endDate: data.endDate ? formatShortDateFromUtc(data.endDate) : null,
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
    throw new Error('게시글을 불러오는 데 실패했습니다.')
  }
}

// 게시글을 수정하는 유틸리티 함수
export const updatePost = async (
  postId: number,
  payload: {
    title: string
    accompanyArea: string
    content: string
    startDate: string | null
    endDate: string | null
  }
) => {
  try {
    const response = await api.patch(
      `/api/v1/accompany/posts/${postId}`,
      payload
    )
    return response
  } catch (error) {
    console.error('게시글 수정 중 오류 발생:', error)
    throw new Error('게시글 수정에 실패했습니다.')
  }
}

// 게시글을 삭제하는 유틸리티 함수
export const deletePost = async (postId: number) => {
  try {
    const response = await api.post(`/api/v1/accompany/posts/${postId}`, {})
    return response
  } catch (error) {
    console.error('게시글 삭제 중 오류 발생:', error)
    throw new Error('게시글 삭제에 실패했습니다.')
  }
}

// 채팅방 나가기 유틸리티 함수
export const leaveChatRoom = async (chatRoomId: number) => {
  try {
    const response = await api.post(`/api/v1/chatRoom/${chatRoomId}/exit`, {})
    return response
  } catch (error) {
    console.error('Failed to leave chat room:', error)
    throw new Error('채팅방 나가기에 실패했습니다.')
  }
}

// 댓글 데이터를 가져오는 유틸리티 함수
export const fetchComments = async (postId: number) => {
  try {
    const commentData = await api.get(`/api/v1/comment/${postId}`)
    return commentData.map((comment: Comment) => ({
      ...comment,
      createdDate: formatToUtcDate(comment.createdAt),
    }))
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    throw new Error('댓글을 불러오는 데 실패했습니다.')
  }
}

// 댓글 등록 유틸리티 함수
export const createComment = async (postId: number, content: string) => {
  try {
    const response = await api.post(`/api/v1/comment`, {
      postId,
      content,
    })
    return response
  } catch (error) {
    console.error('댓글 등록 중 오류 발생:', error)
    throw new Error('댓글 등록에 실패했습니다.')
  }
}

// 댓글 수정 유틸리티 함수
export const updateComment = async (
  commentId: number,
  postId: number,
  content: string
) => {
  try {
    const response = await api.put(`/api/v1/comment/${commentId}`, {
      postId,
      content,
    })
    return response
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error)
    throw new Error('댓글 수정에 실패했습니다.')
  }
}

// 댓글 삭제 유틸리티 함수
export const deleteComment = async (commentId: number) => {
  try {
    const response = await api.post(`/api/v1/comment/${commentId}`, {})
    return response
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error)
    throw new Error('댓글 삭제에 실패했습니다.')
  }
}

// 동행 게시글 내 동행 신청 상태를 조회하는 유틸리티 함수
export const fetchPendingStatus = async (postId: number) => {
  try {
    const response = await api.get(`/api/v1/accompany/posts/${postId}/pending`)
    return response.status
  } catch (error) {
    console.error('Failed to fetch pending status:', error)
    throw new Error('동행 신청 상태를 조회하는 데 실패했습니다.')
  }
}

// 동행 게시글 내 동행 신청 상태를 변경하는 유틸리티 함수
export const applyForAccompany = async (postId: number) => {
  try {
    const response = await api.post(
      `/api/v1/accompany/posts/${postId}/pending`,
      {}
    )
    return response.status
  } catch (error) {
    console.error('Failed to apply for accompany:', error)
    throw new Error('동행 신청에 실패했습니다.')
  }
}
