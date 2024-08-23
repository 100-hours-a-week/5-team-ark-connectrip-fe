// utils/fetchUtils.ts
import { api } from '@/app/utils/api'
import {
  formatToUtcDate,
  formatShortDateFromUtc,
  formatCreatedAt,
} from '@/app/utils/dateUtils'

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
    customUrl: string | null
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

// 댓글 데이터를 가져오는 유틸리티 함수
export const fetchComments = async (postId: number) => {
  try {
    const commentData = await api.get(`/api/v1/comment/${postId}`)
    return commentData.map((comment: any) => ({
      ...comment,
      createdDate: formatCreatedAt(comment.createdAt),
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
