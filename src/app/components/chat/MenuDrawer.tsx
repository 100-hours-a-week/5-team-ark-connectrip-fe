import React, { useState } from 'react'
import { Drawer, Tabs, Tag } from 'antd'
import {
  MenuOutlined,
  UsergroupAddOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons'
import HostContent from './HostContent' // HostContent 컴포넌트 임포트
import GuestContent from './GuestContent' // GuestContent 컴포넌트 임포트

// ApplyUsers 인터페이스 정의
interface ApplyUsers {
  accompanyPostId: number
  memberId: number
  memberNickname: string
  profileImagePath: string
}

// CompanionUsers 인터페이스 정의
interface CompanionUsers {
  chatRoomId: number
  memberId: number
  memberEmail: string
  memberNickname: string
  memberProfileImage: string | null
  memberChatRoomStatus: string
}

const mockData: ApplyUsers[] = [
  {
    accompanyPostId: 1,
    memberId: 2,
    memberNickname: '세니',
    profileImagePath: '',
  },
  {
    accompanyPostId: 1,
    memberId: 3,
    memberNickname: '트룰룰루',
    profileImagePath: '',
  },
  {
    accompanyPostId: 1,
    memberId: 4,
    memberNickname: '냄뀨뀨',
    profileImagePath: '',
  },
  {
    accompanyPostId: 1,
    memberId: 5,
    memberNickname: '노아노아노아',
    profileImagePath: '',
  },
  {
    accompanyPostId: 1,
    memberId: 6,
    memberNickname: '파아아zz',
    profileImagePath: '',
  },
]

// CompanionUsers 데이터
const companionUsersData: CompanionUsers[] = [
  {
    chatRoomId: 1,
    memberId: 1,
    memberEmail: 'a1@naver.com',
    memberNickname: '노노아',
    memberProfileImage: null,
    memberChatRoomStatus: 'ACTIVE',
  },
  {
    chatRoomId: 1,
    memberId: 10,
    memberEmail: 'kookv1002@naver.com',
    memberNickname: '루뜨뜨',
    memberProfileImage:
      'http://k.kakaocdn.net/dn/ZEQvV/btsIzAcVyYL/TkOaaPbnv0jGFEq3idt6Ck/img_640x640.jpg',
    memberChatRoomStatus: 'ACTIVE',
  },
  {
    chatRoomId: 1,
    memberId: 19,
    memberEmail: 'pse6704@naver.com',
    memberNickname: '센세니',
    memberProfileImage:
      'http://k.kakaocdn.net/dn/rzia4/btsEYPys3Ja/IIpIg8cU6mzrZm2DuNq5SK/img_640x640.jpg',
    memberChatRoomStatus: 'ACTIVE',
  },
]

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  /*
  // API 호출하여 데이터 가져오기 (주석 처리)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/your-endpoint')
        const data = await response.json()
        setUsers(data) // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // 컴포넌트가 마운트될 때 한 번만 실행
  */

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
              children: <HostContent applyUsers={mockData} />, // Tab 1의 내용
            },
            {
              key: '2',
              label: '동행 위치',
              icon: <AliwangwangOutlined />,
              children: (
                <GuestContent
                  applyUsers={mockData}
                  companionUsers={companionUsersData}
                />
              ), // Tab 2의 내용
            },
          ]}
        />
      </Drawer>
    </>
  )
}

export default MenuDrawer
