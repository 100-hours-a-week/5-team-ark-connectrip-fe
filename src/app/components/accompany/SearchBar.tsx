import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import SearchIcon from '@/app/components/Icon/SearchIcon'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term: string) => {
    const encodedTerm = encodeURIComponent(term)
    const params = new URLSearchParams(searchParams)
    if (encodedTerm) {
      params.set('query', encodedTerm)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleCreateButtonClick = () => {
    if (pathname === '/accompany') {
      router.push('/accompany/create')
    } else if (pathname === '/community') {
      router.push('/community/create')
    }
  }

  return (
    <div className='flex items-center mb-2 gap-2 h-[40px]'>
      <div className='flex items-center w-full h-[40px] border border-main p-2 rounded-full flex-grow'>
        <SearchIcon />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch(e.target.value)
          }}
          placeholder='게시글 검색'
          className='w-full pl-2 border-none outline-none text-sm'
        />
      </div>
      <button
        onClick={handleCreateButtonClick}
        className='bg-main text-white px-3 py-2 rounded-full flex-shrink-0 text-s h-[40px]'
      >
        게시글 등록 +
      </button>
    </div>
  )
}

export default SearchBar
