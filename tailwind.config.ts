import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#FF9068', // 메인 컬러
        sub: '#FFF5E0', // 서브 컬러
        primary: '#1D4ED8', // 예시 기본 색상 (파란색)
        secondary: '#6B7280', // 예시 보조 색상 (회색)
        accent: '#F59E0B', // 예시 강조 색상 (주황색)
        background: '#F3F4F6', // 배경 색상 (연한 회색)
      },
      fontSize: {
        xs: '10px', // 초소형 텍스트
        s: '12px', // 소형 텍스트
        base: '14px', // 기본 텍스트
        m: '16px', // 중형 텍스트
        l: '18px', // 대형 텍스트
        xl: '24px', // 초대형 텍스트
      },
      spacing: {
        '1': '4px', // 간격 (4px)
        '2': '8px', // 간격 (8px)
        '3': '12px', // 간격 (12px)
        '4': '16px', // 간격 (16px)
        '5': '20px', // 간격 (20px)
        '6': '24px', // 간격 (24px)
      },
      borderRadius: {
        none: '0', // 테두리 반경 없음
        sm: '4px', // 작은 테두리 반경
        default: '8px', // 기본 테두리 반경
        lg: '16px', // 큰 테두리 반경
        full: '9999px', // 완전한 원형 반경
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)', // 작은 그림자
        default: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)', // 기본 그림자
        md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)', // 중간 그림자
        lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)', // 큰 그림자
        xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)', // 아주 큰 그림자
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
