import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export const showConfirmModal = (
  title: string,
  content: string,
  onOk: () => void,
  onCancel?: () => void
) => {
  Modal.confirm({
    title,
    content,
    onOk,
    onCancel,
    okText: '확인',
    cancelText: '취소',
  })
}

export const showDeleteModal = (
  title: string,
  content: string,
  onDelete: () => void
) => {
  Modal.confirm({
    title,
    icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />, // 빨간색 아이콘
    content,
    okText: '삭제',
    okButtonProps: { danger: true }, // 빨간색 삭제 버튼
    cancelText: '취소',
    onOk: onDelete, // 삭제 버튼 클릭 시 동작
    onCancel: () => console.log('삭제 취소됨'), // 취소 버튼 클릭 시 동작 (필요에 따라 수정 가능)
  })
}
