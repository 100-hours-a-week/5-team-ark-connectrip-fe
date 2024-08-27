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
        logo: '40px', // 로고 텍스트
      },
      fontWeight: {
        thin: '100', // 가는 글씨
        light: '300', // 얇은 글씨
        normal: '400', // 기본 글씨
        medium: '500', // 중간 굵기
        semibold: '600', // 반두꺼운 글씨
        bold: '700', // 두꺼운 글씨
        extrabold: '800', // 아주 두꺼운 글씨
        black: '900', // 가장 두꺼운 글씨
      },
      lineHeight: {
        tight: '1.25', // 촘촘한 줄 간격
        snug: '1.375', // 다소 촘촘한 줄 간격
        normal: '1.5', // 기본 줄 간격
        relaxed: '1.625', // 느슨한 줄 간격
        loose: '2', // 넉넉한 줄 간격
      },
      padding: {
        '20px': '20px', // 전체 패딩
      },
      width: {
        'w-300': '300px', // width 300px
        'w-350': '350px', // width 350px
      },
      height: {
        'h-50': '50px', // height 50px
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '768px',
        },
      },
    },
  },
  plugins: [],
}

export default config
