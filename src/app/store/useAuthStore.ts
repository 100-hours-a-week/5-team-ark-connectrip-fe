'use client'
import { create } from 'zustand'
import { api } from '../utils/api'
import router from 'next/router'
interface AuthState {
  userId: string | null
  nickname: string | null
  profileImage: string | null
  setUser: (userData: {
    userId: string
    nickname: string
    profileImage: string
  }) => void
  clearUser: () => void
  fetchUser: () => Promise<
    'SUCCESS' | 'FIRST_LOGIN' | 'ERROR' | 'NOT_FOUND_MEMBER'
  >
}

const useAuthStore = create<AuthState>((set, get) => ({
  userId: null,
  nickname: null,
  profileImage: null,

  // 유저 정보를 한번에 설정
  setUser: ({ userId, nickname, profileImage }) =>
    set({
      userId,
      nickname,
      profileImage,
    }),

  // 유저 정보를 한번에 삭제
  clearUser: () =>
    set({
      userId: null,
      nickname: null,
      profileImage: null,
    }),

  // 서버에서 유저 정보를 가져와 설정

  fetchUser: async () => {
    try {
      const response = await api.get('/api/v1/members/me')
      const { message, data } = response

      if (message === 'FIRST_LOGIN') {
        return 'FIRST_LOGIN'
      } else if (message === 'SUCCESS') {
        const { memberId, nickname, profileImagePath } = data
        get().setUser({
          userId: memberId.toString(),
          nickname,
          profileImage: profileImagePath,
        })

        return 'SUCCESS'
      } else {
        return 'ERROR'
      }
    } catch (error) {
      console.error('유저 정보를 가져오는 중 오류 발생:', error)
      return 'ERROR'
    }
  },
}))

export default useAuthStore
