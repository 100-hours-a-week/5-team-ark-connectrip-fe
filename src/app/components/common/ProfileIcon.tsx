import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface ProfileIconProps {
  src: string | StaticImageData
  size: number
  nickname: string
  onClick?: () => void // 선택적으로 onClick 핸들러 추가
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  src,
  size,
  nickname,
  onClick,
}) => {
  const isValidSrc = typeof src === 'string' && src.trim() !== ''

  if (!isValidSrc) {
    // 이미지가 없을 때 닉네임의 첫 글자 표시
    // 이미지가 없을 때
    return (
      <div className='flex-shrink-0'>
        <div
          className='flex items-center justify-center rounded-full'
          style={{
            width: size,
            height: size,
            backgroundColor: '#919fe3',
            color: 'white',
            fontSize: size * 0.4, // 아이콘 크기에 비례하여 글자 크기를 조정
            fontWeight: 'bold',
            zIndex: 10,
            cursor: onClick ? 'pointer' : 'default', // 클릭 가능한 경우 커서 변경
          }}
          onClick={onClick} // 클릭 이벤트 처리
        >
          {nickname.charAt(0).toUpperCase()} {/* 닉네임의 첫 글자 */}
        </div>
      </div>
    )
  }

  return (
    <div
      className='flex-shrink-0 rounded-full overflow-hidden'
      style={{
        width: size,
        height: size,
        cursor: onClick ? 'pointer' : 'default', // 클릭 가능한 경우 커서 변경
      }}
      onClick={onClick} // 클릭 이벤트 처리
    >
      <Image
        src={src}
        alt='Profile'
        width={size}
        height={size}
        className='rounded-full'
        style={{
          objectFit: 'cover', // 이미지를 크기에 맞게 자름
          width: '100%', // 부모의 크기에 맞춰 조정
          height: '100%', // 부모의 크기에 맞춰 조정
        }}
      />
    </div>
  )
}

export default ProfileIcon
