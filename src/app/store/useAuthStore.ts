import { create } from 'zustand'
import { api } from '../utils/api'
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
  fetchUser: () => Promise<void>
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
        throw new Error('FIRST_LOGIN') // 예외를 던져 라우팅을 컴포넌트에서 처리
      } else if (message === 'SUCCESS') {
        const { memberId, nickname, profileImagePath } = data
        get().setUser({
          userId: memberId.toString(),
          nickname,
          profileImage: profileImagePath,
        })
      }
    } catch (error) {
      console.error('유저 정보를 가져오는 중 오류 발생:', error)
      throw error // 예외를 던져 컴포넌트에서 라우팅을 처리
    }
  },
}))

export default useAuthStore
