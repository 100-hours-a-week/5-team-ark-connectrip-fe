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
    style: { top: '50%', transform: 'translateY(-50%)' }, // 모달을 중앙에 위치시키는 스타일
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
    style: { top: '50%', transform: 'translateY(-50%)' }, // 모달을 중앙에 위치시키는 스타일
    onOk: onDelete, // 삭제 버튼 클릭 시 동작
    // onCancel: () => console.log('삭제 취소됨'), // 취소 버튼 클릭 시 동작 (필요에 따라 수정 가능)
  })
}

export const showCancelModal = (
  title: string,
  content: string,
  onCancel: () => void
) => {
  Modal.confirm({
    title,
    icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />, // 빨간색 아이콘
    content,
    okText: '취소', // 확인 버튼의 텍스트를 '취소'로 설정
    okButtonProps: { danger: true }, // 빨간색 삭제 버튼
    cancelText: '닫기', // 취소 버튼의 텍스트를 '닫기'로 설정
    style: { top: '50%', transform: 'translateY(-50%)' }, // 모달을 중앙에 위치시키는 스타일
    onOk: onCancel, // '취소' 버튼 클릭 시 동작
  })
}
