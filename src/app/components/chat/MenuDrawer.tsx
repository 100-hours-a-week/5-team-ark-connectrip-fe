import React, { useState } from 'react'
import { Drawer, Tabs } from 'antd'
import {
  MenuOutlined,
  UsergroupAddOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons'
import HostContent from './HostContent' // HostContent 컴포넌트 임포트
import GuestContent from './GuestContent' // GuestContent 컴포넌트 임포트

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div
        className='pl-5 text-secondary hover:text-black cursor-pointer'
        onClick={showDrawer}
      >
        <MenuOutlined style={{ fontSize: 20 }} />
      </div>
      <Drawer
        title='동행 채팅방'
        placement='right'
        closable={true}
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: '0 24px' }}
      >
        <Tabs
          defaultActiveKey='1'
          items={[
            {
              key: '1',
              label: '동행 신청 목록',
              icon: <UsergroupAddOutlined />,
              children: <HostContent />, // Tab 1의 내용
            },
            {
              key: '2',
              label: '동행 위치',
              icon: <AliwangwangOutlined />,
              children: <GuestContent />, // Tab 2의 내용
            },
          ]}
        />
      </Drawer>
    </>
  )
}

export default MenuDrawer
