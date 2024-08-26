import dayjs from 'dayjs'

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
  leaderId: number
  title: string
  profileImagePath: string
  nickname: string
  createdAt: string
  accompanyArea: string
  startDate?: string
  endDate?: string
  content: string
  customUrl: string
  urlQrPath: string
}

export interface PostCardProps {
  title: string
  content: string
  startDate?: string
  endDate?: string
  accompanyArea: string
  createdAt: string
  nickname: string
  profileImagePath: string | null
}

export interface PrevPost {
  id: number
  title: string
  content: string
  startDate: string
  endDate: string
  accompanyArea: string
  createdAt: string
  nickname: string
  profileImagePath: string | null
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

// 게시글 데이터 인터페이스
export interface PostForm {
  title: string
  accompanyArea: string
  startDate: string | null
  endDate: string | null
  content: string
  customUrl: string | null
}

// 폼 초기값 인터페이스
export interface FormValues {
  title: string
  accompanyArea: string
  startDate: dayjs.Dayjs | null
  endDate: dayjs.Dayjs | null
  content: string
  customUrl: string | null
}

// AccompanyForm 컴포넌트에 전달되는 props 인터페이스
export interface AccompanyFormProps {
  initialValues: FormValues
  onSubmit: (values: FormValues) => void
  submitText: string
}

// 캘린더 아이콘 인터페이스
export interface CalendarIconProps {
  width?: number
  height?: number
  fill?: string
}

// 회원가입 폼 값 인터페이스
export interface SignupFormValues {
  nickname: string
  birthDate: string
  gender: 'male' | 'female'
  privacyPolicy: boolean // 개인정보 처리방침 동의 여부
  termsOfService: boolean // 이용약관 동의 여부
}
