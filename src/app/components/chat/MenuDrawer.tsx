import React, { useEffect, useState } from 'react'
import { Drawer, Tabs, Tag } from 'antd'
import {
  MenuOutlined,
  UsergroupAddOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons'
import { HostContent } from './HostContent' // HostContent 컴포넌트 임포트
import GuestContent from './GuestContent' // GuestContent 컴포넌트 임포트
import { ApplyUsers, CompanionUsers, ChatRoomEntryData } from '@/interfaces'
import { fetchPendingUsers, fetchCompanionUsers } from '@/app/utils/fetchUtils'
import useAuthStore from '@/app/store/useAuthStore'
interface MenuDrawerProps {
  chatRoomData: ChatRoomEntryData
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ chatRoomData }) => {
  const [open, setOpen] = useState(false)
  const [applyUsers, setApplyUsers] = useState<ApplyUsers[]>([])
  const [companionUsers, setCompanionUsers] = useState<CompanionUsers[]>([])
  const { userId } = useAuthStore()

  console.log(chatRoomData)
  const chatRoomId = chatRoomData?.chatRoomId || 0
  const postId = chatRoomData?.accompanyPostId || 0
  const leaderId = chatRoomData?.leaderId

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

  // Drawer가 열릴 때 데이터를 fetch
  const showDrawer = () => {
    setOpen(true)
    fetchData()
  }

  // Drawer를 닫을 때
  const onClose = () => {
    setOpen(false)
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
        onClick={showDrawer}
      >
        <MenuOutlined style={{ fontSize: 20 }} />
      </div>
      <Drawer
        title={
          <div className='flex items-center gap-2'>
            <span>동행 채팅방</span>
            <Tag color='#74cccc'>모집중</Tag>
          </div>
        }
        placement='right'
        closable={true}
        onClose={onClose}
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
                      />
                    ),
                  },
                  {
                    key: '2',
                    label: '동행 위치',
                    icon: <AliwangwangOutlined />,
                    children: <GuestContent companionUsers={companionUsers} />,
                  },
                ]
              : [
                  {
                    key: '2',
                    label: '동행 위치',
                    icon: <AliwangwangOutlined />,
                    children: <GuestContent companionUsers={companionUsers} />,
                  },
                ]
          }
        />
      </Drawer>
    </>
  )
}

export default MenuDrawer
