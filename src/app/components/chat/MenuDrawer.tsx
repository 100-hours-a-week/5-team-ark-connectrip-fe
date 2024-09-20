import React, { useEffect, useState } from 'react'
import { Drawer, Tabs, Tag } from 'antd'
import {
  MenuOutlined,
  UsergroupAddOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons'
import { HostContent } from './HostContent' // HostContent 컴포넌트 임포트
import GuestContent from './GuestContent' // GuestContent 컴포넌트 임포트
import {
  ApplyUsers,
  CompanionUsers,
  ChatRoomEntryData,
  CompanionLocation,
} from '@/interfaces'
import { fetchPendingUsers, fetchCompanionUsers } from '@/app/utils/fetchUtils'
import useAuthStore from '@/app/store/useAuthStore'
import { RecruitmentStatus } from '@/types'
interface MenuDrawerProps {
  chatRoomData: ChatRoomEntryData
  companionLocations: CompanionLocation[] // 동행자 위치 배열
  setCompanionLocations: React.Dispatch<
    React.SetStateAction<CompanionLocation[]>
  > // 상태 업데이트 함수
  isLocationSharingEnabled?: boolean
}

const statusTranslations: { [key in RecruitmentStatus]: string } = {
  PROGRESSING: '모집중',
  CLOSED: '모집 마감',
  FINISHED: '동행 종료',
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  chatRoomData,
  companionLocations,
  setCompanionLocations,
  isLocationSharingEnabled = false,
}) => {
  const [open, setOpen] = useState(false)
  const [applyUsers, setApplyUsers] = useState<ApplyUsers[]>([])
  const [companionUsers, setCompanionUsers] = useState<CompanionUsers[]>([])
  const { userId } = useAuthStore()

  const chatRoomId = chatRoomData?.chatRoomId || 0
  const postId = chatRoomData?.accompanyPostId || 0
  const leaderId = chatRoomData?.leaderId
  const [accompanyStatus, setAccompanyStatus] = useState<RecruitmentStatus>(
    chatRoomData?.status || 'PROGRESSING'
  )
  const isPostExists = chatRoomData.isPostExists

  // 데이터 fetch 함수
  const fetchData = async () => {
    if (chatRoomId && postId) {
      try {
        // Leader와 현재 유저 ID를 비교하여 fetch할 데이터를 결정
        if (leaderId.toString() === userId) {
          const [pendingUsersData, companionUsersData] = await Promise.all([
            fetchPendingUsers(postId),
            fetchCompanionUsers(chatRoomId),
          ])
          setApplyUsers(pendingUsersData)
          setCompanionUsers(companionUsersData)
        } else {
          const companionUsersData = await fetchCompanionUsers(chatRoomId)
          setCompanionUsers(companionUsersData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }

  // Drawer 열기/닫기 토글 함수
  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen)
    if (!open) {
      fetchData()
    }
  }

  useEffect(() => {
    // 유효한 chatRoomId와 postId가 있을 때만 데이터를 fetch
    if (chatRoomId && postId) {
      fetchData()
    }
  }, [postId, chatRoomId])

  return (
    <>
      <div
        className='pl-5 text-secondary hover:text-black cursor-pointer'
        onClick={toggleDrawer}
      >
        <MenuOutlined style={{ fontSize: 20 }} />
      </div>
      <Drawer
        title={
          <div className='flex items-center gap-2'>
            <span>동행 채팅방</span>
            <Tag color='#74cccc'>{statusTranslations[accompanyStatus]}</Tag>
          </div>
        }
        placement='right'
        closable={true}
        onClose={toggleDrawer}
        open={open}
        styles={{ body: { padding: '0 24px' } }}
      >
        <Tabs
          defaultActiveKey='1'
          items={
            leaderId.toString() === userId
              ? [
                  {
                    key: '1',
                    label: '동행 신청 목록',
                    icon: <UsergroupAddOutlined />,
                    children: (
                      <HostContent
                        applyUsers={applyUsers}
                        postId={postId}
                        setCompanionUsers={setCompanionUsers}
                        setApplyUsers={setApplyUsers}
                        setAccompanyStatus={setAccompanyStatus}
                        accompanyStatus={accompanyStatus}
                      />
                    ),
                  },
                  {
                    key: '2',
                    label: '동행 위치',
                    icon: <AliwangwangOutlined />,
                    children: (
                      <GuestContent
                        companionUsers={companionUsers}
                        postId={postId}
                        isPostExists={isPostExists}
                        leaderId={leaderId}
                        companionLocations={companionLocations}
                        setCompanionLocations={setCompanionLocations}
                        isLocationSharingEnabled={isLocationSharingEnabled}
                      />
                    ),
                  },
                ]
              : [
                  {
                    key: '2',
                    label: '동행 위치',
                    icon: <AliwangwangOutlined />,
                    children: (
                      <GuestContent
                        companionUsers={companionUsers}
                        postId={postId}
                        isPostExists={isPostExists}
                        leaderId={leaderId}
                        companionLocations={companionLocations}
                        setCompanionLocations={setCompanionLocations}
                        isLocationSharingEnabled={isLocationSharingEnabled}
                      />
                    ),
                  },
                ]
          }
        />
      </Drawer>
    </>
  )
}

export default MenuDrawer
