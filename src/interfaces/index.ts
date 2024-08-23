export interface Chat {
  chatRoomId: number
  accompanyPostId: number
  accompanyPostTitle: string
  accompanyArea: string
  startDate: string
  endDate: string
  lastChatMessage: string
  lastChatMessageTime: string
  memberNumber: number
}

export interface GroupCardProps {
  accompanyPostTitle: string
  accompanyArea: string
  startDate: string
  endDate: string
  lastChatMessage: string
  lastChatMessageTime: string
  memberNumber: number
}

export interface Post {
  id: number
  memberId: number
  title: string
  profileImagePath: string
  nickname: string
  createdAt: string
  accompanyArea: string
  startDate?: string
  endDate?: string
  content: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DEFAULT'
  customUrl: string
  urlQrPath: string
}

export interface Comment {
  id: number
  memberId: number
  accompanyPostId: number
  content: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  memberProfileImage: string
  memberNickname: string
}
