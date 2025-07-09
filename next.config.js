/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // 정적 사이트 내보내기 설정
    output: 'export',
    trailingSlash: true,

    // 이미지 최적화 설정
    images: {
        unoptimized: true, // 정적 내보내기에서는 이미지 최적화 비활성화
        domains: ['cdn.dummyjson.com'],
    },

    // 환경 변수
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    },

    // 빌드 최적화 (개발 환경에서는 비활성화)
    experimental: {
        // optimizeCss: true, // 개발 환경에서 문제가 있어서 주석 처리
    },

    // 정적 내보내기를 위한 설정
    assetPrefix: process.env.NODE_ENV === 'production' ? '/artinus-frontend-assignment' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/artinus-frontend-assignment' : '',
};

module.exports = nextConfig;