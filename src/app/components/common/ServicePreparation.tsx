// components/common/ServicePreparation.js

export default function ServicePreparation() {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex items-center justify-between mt-1 mb-4'>
          <h1 className='text-lg font-bold text-black mx-1'>내 프로필</h1>
        </div>
        <img
          src='https://cdn-icons-png.flaticon.com/512/6897/6897039.png'
          width={50}
          height={50}
          alt=''
        />
        <div className='wrapper text-center'>
          서비스
          <br />
          준비중입니다.
        </div>
      </div>
    </div>
  )
}
