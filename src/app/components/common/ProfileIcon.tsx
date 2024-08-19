import Image, { StaticImageData } from 'next/image'

interface ProfileIconProps {
  src: string | StaticImageData
  size: number
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ src, size }) => {
  return (
    <Image
      src={src}
      alt='Profile'
      width={size}
      height={size}
      className='rounded-full'
    />
  )
}

export default ProfileIcon
