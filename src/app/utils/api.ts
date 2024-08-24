import { getCookie } from 'cookies-next'

interface RequestOptions extends RequestInit {
  headers?: HeadersInit
  /* eslint-disable @typescript-eslint/no-explicit-any */
  body?: any
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''

const getHeaders = () => {
  const accessToken = getCookie('accessToken')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

// 다양한 데이터 타입 처리
const handleRequestBody = (params: Record<string, unknown> | FormData) => {
  if (params instanceof FormData) {
    return {
      body: params,
      contentType: null, // FormData의 경우 Content-Type을 자동 설정
    }
  }

  if (params && typeof params === 'object') {
    return {
      body: JSON.stringify(params),
      contentType: 'application/json',
    }
  }

  return {
    body: String(params),
    contentType: 'text/plain',
  }
}

// 응답 데이터 처리
const parseResponseData = async (response: Response) => {
  const contentType = response.headers.get('Content-Type')
  // Content-Type이 없을 때 빈 객체를 반환
  if (!contentType) {
    return {}
  }

  if (contentType.includes('application/json')) {
    return await response.json()
  } else if (contentType.includes('text')) {
    return await response.text()
  } else {
    return await response.blob()
  }
}

// 응답 처리
const handleResponse = async (response: Response) => {
  const data = await parseResponseData(response)

  if (!response.ok) {
    // 에러 상태에 따른 상세 처리
    // TODO: 에러 코드 별 처리 로직 추가
    const errorMessage =
      response.status === 404
        ? 'Requested resource not found'
        : (data.message as string) || 'Something went wrong'

    throw new Error(errorMessage)
  }

  return data
}

export const api = {
  get: async (endpoint: string, options: RequestOptions = {}) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        method: 'GET',
        headers: {
          ...getHeaders(),
          ...options.headers,
        },
        credentials: 'include', // 쿠키와 함께 요청
      })
      return handleResponse(response)
    } catch (error) {
      handleNetworkError(error)
    }
  },

  post: async (
    endpoint: string,
    params: Record<string, unknown> | FormData,
    options: RequestOptions = {}
  ) => {
    try {
      const { body, contentType } = handleRequestBody(params)
      const headers = getHeaders()
      if (contentType) headers['Content-Type'] = contentType

      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        method: 'POST',
        headers: {
          ...headers,
          ...options.headers,
        },
        credentials: 'include',
        body,
      })
      return handleResponse(response)
    } catch (error) {
      handleNetworkError(error)
    }
  },

  put: async (
    endpoint: string,
    params: Record<string, unknown> | FormData,
    options: RequestOptions = {}
  ) => {
    try {
      const { body, contentType } = handleRequestBody(params)
      const headers = getHeaders()
      if (contentType) headers['Content-Type'] = contentType

      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        method: 'PUT',
        headers: {
          ...headers,
          ...options.headers,
        },
        credentials: 'include',
        body,
      })
      return handleResponse(response)
    } catch (error) {
      handleNetworkError(error)
    }
  },

  patch: async (
    endpoint: string,
    params: Record<string, unknown> | FormData,
    options: RequestOptions = {}
  ) => {
    try {
      const { body, contentType } = handleRequestBody(params)
      const headers = getHeaders()
      if (contentType) headers['Content-Type'] = contentType

      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        method: 'PATCH',
        headers: {
          ...headers,
          ...options.headers,
        },
        credentials: 'include',
        body,
      })
      return handleResponse(response)
    } catch (error) {
      handleNetworkError(error)
    }
  },

  delete: async (endpoint: string, options: RequestOptions = {}) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        method: 'DELETE',
        headers: {
          ...getHeaders(),
          ...options.headers,
        },
        credentials: 'include',
      })
      return handleResponse(response)
    } catch (error) {
      handleNetworkError(error)
    }
  },
}

// 네트워크 에러 핸들링
const handleNetworkError = (error: unknown) => {
  console.error('API 요청 중 네트워크 오류:', error)
  throw new Error('Network error occurred. Please try again later.')
}
