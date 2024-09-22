import React, { useEffect, useRef } from 'react'
import ProfileIcon from '../common/ProfileIcon'
import { Button } from 'antd'
import { ApplyUsers, CompanionUsers } from '@/interfaces'
import {
  acceptUser,
  rejectUser,
  updatePostStatus,
} from '@/app/utils/fetchUtils'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'
import { RecruitmentStatus } from '@/types'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

interface HostContentProps {
  applyUsers: ApplyUsers[]
  postId: number
  setCompanionUsers: React.Dispatch<React.SetStateAction<CompanionUsers[]>>
  setApplyUsers: React.Dispatch<React.SetStateAction<ApplyUsers[]>>
  setAccompanyStatus: React.Dispatch<React.SetStateAction<RecruitmentStatus>>
  accompanyStatus: RecruitmentStatus
}

export const HostContent: React.FC<HostContentProps> = ({
  applyUsers,
  postId,
  setCompanionUsers,
  setApplyUsers,
  setAccompanyStatus,
  accompanyStatus,
}) => {
  const { contextHolder, showSuccess, showWarning } = useCustomMessage()
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/ws/init`)
    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        clientRef.current = client
      },
      onStompError: (error) => {
        console.error('STOMP error:', error)
      },
    })
    client.activate()

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate()
      }
    }
  }, [chatRoomId])

  const sendAcceptMessage = (acUserId: number, acNickname: string) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: `/pub/chat/room/${chatRoomId}`,
        body: JSON.stringify({
          chatRoomId: chatRoomId,
          senderId: acUserId,
          content: `${acNickname}님이 입장하셨습니다.`,
          infoFlag: true,
        }),
      })
    }
  }

  const handleAccept = async (memberId: number) => {
    try {
      await acceptUser(postId, memberId)
      // 새 companion user를 추가
      const acceptedUser = applyUsers.find((user) => user.memberId === memberId)
      if (acceptedUser) {
        sendAcceptMessage(acceptedUser.memberId, acceptedUser.memberNickname)
        setCompanionUsers((prevCompanions) => [
          ...prevCompanions,
          {
            chatRoomId: chatRoomId,
            memberId: acceptedUser.memberId,
            memberNickname: acceptedUser.memberNickname,
            memberProfileImage: acceptedUser.profileImagePath,
            memberChatRoomStatus: 'ACTIVE',
          },
        ])
      }
      showSuccess('수락이 완료되었습니다.')
      // 수락 후, setApplyUsers를 통해 유저 목록에서 삭제
      setApplyUsers((prevUsers) =>
        prevUsers.filter((user) => user.memberId !== memberId)
      )
    } catch (error) {
      console.error('Failed to accept user:', error)
      showWarning('수락에 실패했습니다.')
    }
  }

  const handleReject = async (memberId: number) => {
    try {
      await rejectUser(postId, memberId)
      showSuccess('거절이 완료되었습니다.')
      // 거절 후, setApplyUsers를 통해 유저 목록에서 삭제
      setApplyUsers((prevUsers) =>
        prevUsers.filter((user) => user.memberId !== memberId)
      )
    } catch (error) {
      console.error('Failed to reject user:', error)
      showWarning('거절에 실패했습니다.')
    }
  }

  const handleUpdateStatus = async (newStatus: RecruitmentStatus) => {
    try {
      await updatePostStatus(postId)
      setAccompanyStatus(newStatus)
      if (newStatus === 'CLOSED') {
        showSuccess('모집이 종료되었습니다.')
      } else if (newStatus === 'FINISHED') {
        showSuccess('동행이 종료되었습니다.')
      }
    } catch (error) {
      console.error('Failed to update post status:', error)
      showWarning('상태 변경에 실패했습니다.')
    }
  }

  // 상태에 따른 메시지 객체
  const statusMessages: { [key in RecruitmentStatus]: string } = {
    PROGRESSING:
      '모집이 완료되었다면 모집 종료를 클릭해주세요!</br>더 이상 신청 내역이 보이지 않습니다.',
    CLOSED:
      '동행이 완료되었다면 동행 종료를 클릭해주세요!</br>동행 종료 시점부터 동행 간 후기 작성이 가능해집니다.',
    FINISHED: '동행이 종료되었습니다.',
  }

  return (
    <div>
      {contextHolder}
      {accompanyStatus === 'PROGRESSING' && (
        <>
          {/* 동행 신청 목록 컴포넌트 */}
          {applyUsers.length > 0 ? (
            applyUsers.map((user) => (
              <div key={user.memberId} className='mb-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex gap-2 justify-center items-center'>
                    <ProfileIcon
                      src={user.profileImagePath}
                      size={33}
                      nickname={user.memberNickname}
                    />
                    <div className='text-m font-semibold'>
                      {user.memberNickname}
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      type='primary'
                      className='rounded-full'
                      onClick={() => handleAccept(user.memberId)}
                    >
                      수락
                    </Button>
                    <Button
                      type='default'
                      className='rounded-full'
                      onClick={() => handleReject(user.memberId)}
                    >
                      거절
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex h-[100px] justify-center items-center text-center text-gray-500'>
              동행을 신청한 유저가 없습니다.
            </div>
          )}
        </>
      )}
      <div className='h-40 flex justify-center items-center'>
        <p
          className='p-3 text-center text-sm'
          dangerouslySetInnerHTML={{ __html: statusMessages[accompanyStatus] }}
        />
      </div>

      {accompanyStatus === 'PROGRESSING' && (
        <Button
          type='primary'
          className='w-full rounded-full'
          onClick={() => handleUpdateStatus('CLOSED')}
        >
          모집 종료
        </Button>
      )}
      {accompanyStatus === 'CLOSED' && (
        <Button
          type='primary'
          className='w-full rounded-full'
          onClick={() => handleUpdateStatus('FINISHED')}
        >
          동행 종료
        </Button>
      )}
      <br />
    </div>
  )
}
