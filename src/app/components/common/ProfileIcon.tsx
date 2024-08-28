import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface ProfileIconProps {
  src: string | StaticImageData
  size: number
  nickname: string
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ src, size, nickname }) => {
  if (!src) {
    // 이미지가 없을 때
    return (
      <div>
        <div
          className='flex items-center justify-center rounded-full'
          style={{
            width: size,
            height: size,
            backgroundColor: '#919fe3',
            color: 'white',
            fontSize: size * 0.4, // 아이콘 크기에 비례하여 글자 크기를 조정
            fontWeight: 'bold',
          }}
        >
          {nickname.charAt(0).toUpperCase()} {/* 닉네임의 첫 글자 */}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Image
        src={src}
        alt='Profile'
        width={size}
        height={size}
        className='rounded-full'
        style={{
          objectFit: 'cover', // 이미지를 크기에 맞게 자름
          width: size,
          height: size,
        }}
      />
    </div>
  )
}

export default ProfileIcon
