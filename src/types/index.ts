// 닉네임 상태 타입 정의
export type NicknameStatus = 'valid' | 'invalid' | 'duplicated' | null

// 개인 유저의 동행 신청 상태
export type AccompanyStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'NONE'
  | 'EXIT'

// 동행 게시글/채팅방의 모집 상태 ( 진행중, 모집마감, 동행종료 )
export type RecruitmentStatus = 'PROGRESSING' | 'CLOSED' | 'FINISHED'
