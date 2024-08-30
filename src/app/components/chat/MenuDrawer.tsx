import React, { useEffect, useState } from 'react'
import { Drawer, Tabs, Tag } from 'antd'
import {
  MenuOutlined,
  UsergroupAddOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons'
import { HostContent } from './HostContent' // HostContent 컴포넌트 임포트
import GuestContent from './GuestContent' // GuestContent 컴포넌트 임포트
import { ApplyUsers, CompanionUsers } from '@/interfaces'
import { fetchPendingUsers, fetchCompanionUsers } from '@/app/utils/fetchUtils'
import { usePathname } from 'next/navigation'

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [applyUsers, setApplyUsers] = useState<ApplyUsers[]>([])
  const [companionUsers, setCompanionUsers] = useState<CompanionUsers[]>([])
  const path = usePathname()

  const postId = 37 // 동행 게시글 ID
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)

  const fetchData = async () => {
    try {
      const [pendingUsersData, companionUsersData] = await Promise.all([
        fetchPendingUsers(postId),
        fetchCompanionUsers(chatRoomId),
      ])
      console.log('pendingUsersData:', pendingUsersData)
      console.log('companionUsersData:', companionUsersData)

      setApplyUsers(pendingUsersData)
      setCompanionUsers(companionUsersData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const showDrawer = () => {
    setOpen(true)
    fetchData() // Drawer가 열릴 때마다 데이터를 fetch
  }

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    fetchData()
  }, [postId, chatRoomId])

  return (
    <>
      <div
        className='pl-5 text-secondary hover:text-black cursor-pointer'
        onClick={showDrawer}
      >
        <MenuOutlined style={{ fontSize: 20 }} />
      </div>
      {/*  {/*  main: '#74cccc', // 메인 컬러
        sub: '#b3bbee', secondary: '#6B7280' */}
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
          items={[
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
              ), // Tab 1의 내용
            },
            {
              key: '2',
              label: '동행 위치',
              icon: <AliwangwangOutlined />,
              children: <GuestContent companionUsers={companionUsers} />, // Tab 2의 내용
            },
          ]}
        />
      </Drawer>
    </>
  )
}

export default MenuDrawer
