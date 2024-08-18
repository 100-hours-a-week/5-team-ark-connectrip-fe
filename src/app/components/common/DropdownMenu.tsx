// components/DropdownMenu.tsx
'use client'

import React, { useRef, useEffect, useState, ReactNode } from 'react'

interface DropdownMenuProps {
  triggerComponent: ReactNode // 드롭다운을 열기 위한 트리거 컴포넌트
  menuItems: { label: string; onClick: () => void }[] // 메뉴 항목
}

export default function DropdownMenu({
  triggerComponent,
  menuItems,
}: DropdownMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <div onClick={toggleDropdown} className='cursor-pointer'>
        {triggerComponent}
      </div>
      {dropdownOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg'>
          <div className='py-2'>
            {menuItems.map((item, index) => (
              <button
                key={index}
                className='block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left'
                onClick={() => {
                  item.onClick()
                  setDropdownOpen(false) // 메뉴를 클릭하면 드롭다운을 닫음
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
