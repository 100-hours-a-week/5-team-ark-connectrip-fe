import ScrollToTopButton from '@/app/components/accompany/ScrollToTopButton'
import CarouselComponent from '@/app/components/accompany/CarouselComponent'
import AccompanyPostClient from '@/app/components/accompany/AccompanyPostClient'

export default function AccompanyHome() {
  return (
    <div className='w-full p-6 mb-6'>
      <CarouselComponent />
      <div className='flex items-center justify-between my-4'>
        <h1 className='text-lg font-bold text-black mx-1'>동행 게시판</h1>
      </div>
      <AccompanyPostClient />
      <ScrollToTopButton />
    </div>
  )
}
