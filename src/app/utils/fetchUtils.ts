// utils/fetchUtils.ts
import { api } from '@/app/utils/api'
import { formatToUtcDate, formatShortDateFromUtc } from '@/app/utils/dateUtils'
import { Comment, ChatRoomEntryData } from '@/interfaces/index'

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

// 동행 신청 취소 유틸리티 함수
export const cancelAccompanyApplication = async (postId: number) => {
  try {
    const response = await api.post(
      `/api/v1/accompany/posts/${postId}/pending/cancel`,
      {}
    )
    return response
  } catch (error) {
    console.error('Failed to cancel accompany application:', error)
    throw new Error('동행 신청 취소에 실패했습니다.')
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

//채팅방 ////////////////////////////////////////////////////////////////
// 동행 신청 내역을 가져오는 유틸리티 함수
export const fetchPendingUsers = async (postId: number) => {
  try {
    const response = await api.get(
      `/api/v1/accompany/posts/${postId}/pending/list`
    )
    return response
  } catch (error) {
    console.error('Failed to fetch pending users:', error)
    throw new Error('동행 신청 내역을 불러오는 데 실패했습니다.')
  }
}

// 채팅방 참여자 리스트를 가져오는 유틸리티 함수
export const fetchCompanionUsers = async (chatRoomId: number) => {
  try {
    const response = await api.get(`/api/v1/chatRoom/${chatRoomId}/members`)
    return response
  } catch (error) {
    console.error('Failed to fetch companion users:', error)
    throw new Error('채팅방 참여자 리스트를 불러오는 데 실패했습니다.')
  }
}

// 동행 신청을 수락하는 유틸리티 함수
export const acceptUser = async (postId: number, memberId: number) => {
  try {
    const response = await api.post(
      `/api/v1/accompany/posts/${postId}/pending/accept/${memberId}`,
      {}
    )
    return response
  } catch (error) {
    console.error('Failed to accept user:', error)
    throw new Error('동행 신청을 수락하는 데 실패했습니다.')
  }
}

// 동행 신청을 거절하는 유틸리티 함수
export const rejectUser = async (postId: number, memberId: number) => {
  try {
    const response = await api.post(
      `/api/v1/accompany/posts/${postId}/pending/reject/${memberId}`,
      {}
    )
    return response
  } catch (error) {
    console.error('Failed to reject user:', error)
    throw new Error('동행 신청을 거절하는 데 실패했습니다.')
  }
}

// 채팅방 입장 유효성 체크 유틸리티 함수
export const checkChatRoomEntry = async (
  chatRoomId: number
): Promise<{ message: string; data: ChatRoomEntryData }> => {
  try {
    const response = await api.get(`/api/v1/chatRoom/${chatRoomId}/enter`, {})
    return response // 성공 시 반환되는 데이터
  } catch (error) {
    console.error('Failed to enter chat room:', error)
    throw new Error('채팅방 입장에 실패했습니다.')
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

// 방장이 게시글 동행 상태를 변경하는 유틸리티 함수
export const updatePostStatus = async (postId: number) => {
  try {
    const response = await api.post(
      `/api/v1/accompany/posts/${postId}/status`,
      {}
    )
    return response
  } catch (error) {
    console.error('Failed to update post status:', error)
    throw new Error('게시글 상태 변경에 실패했습니다.')
  }
}

// 채팅방의 이전 메시지를 가져오는 유틸리티 함수
export const getPreviousMessages = async (chatRoomId: number) => {
  try {
    const response = await api.get(`/api/v1/chatRoom/${chatRoomId}/messages`)
    return response // 이전 메시지를 반환
  } catch (error) {
    console.error('Failed to fetch previous messages:', error)
    throw new Error('이전 메시지를 불러오는 데 실패했습니다.')
  }
}

//커뮤니티//////////////////////////////////////////////////////////////
// 게시글 데이터를 가져오는 유틸리티 함수
export const fetchCommunityPost = async (postId: number) => {
  try {
    const data = await api.get(`/api/v1/community/posts/${postId}`)
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
export const updateCommunityPost = async (
  postId: number,
  payload: {
    title: string
    content: string
  }
) => {
  try {
    const response = await api.put(`/api/v1/community/posts/${postId}`, payload)
    return response
  } catch (error) {
    console.error('게시글 수정 중 오류 발생:', error)
    throw new Error('게시글 수정에 실패했습니다.')
  }
}

// 게시글을 삭제하는 유틸리티 함수
export const deleteCommunityPost = async (postId: number) => {
  try {
    const response = await api.post(
      `/api/v1/community/posts/${postId}/delete`,
      {}
    )
    return response
  } catch (error) {
    console.error('게시글 삭제 중 오류 발생:', error)
    throw new Error('게시글 삭제에 실패했습니다.')
  }
}

// 댓글 데이터를 가져오는 유틸리티 함수
export const fetchCommunityComments = async (postId: number) => {
  try {
    const commentData = await api.get(`/api/v1/community/comment/${postId}`)
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
export const createCommunityComment = async (
  postId: number,
  content: string
) => {
  try {
    const response = await api.post(`/api/v1/community/comment`, {
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
export const updateCommunityComment = async (
  commentId: number,
  postId: number,
  content: string
) => {
  try {
    const response = await api.put(`/api/v1/community/comment/${commentId}`, {
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
export const deleteCommunityComment = async (commentId: number) => {
  try {
    const response = await api.post(
      `/api/v1/community/comment/${commentId}/delete`,
      {}
    )
    return response
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error)
    throw new Error('댓글 삭제에 실패했습니다.')
  }
}
