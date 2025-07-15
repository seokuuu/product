const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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

    // 빌드 최적화
    experimental: {
        // 런타임 청크 최적화
        esmExternals: true,
    },

    // 압축 설정
    compress: true,

    // 웹팩 최적화
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // 프로덕션 빌드에서만 최적화 적용
        if (!dev) {
            // 번들 크기 최적화
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // 외부 라이브러리 청크
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: /node_modules/,
                        priority: 20,
                    },
                    // 공통 컴포넌트 청크
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                },
            };

            // 중복 제거
            config.optimization.usedExports = true;
            config.optimization.sideEffects = false;
        }

        return config;
    },

    // 정적 내보내기에서는 headers가 동작하지 않으므로 주석 처리
    // 대신 웹 서버 설정에서 캐싱 헤더를 설정해야 함
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf)',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'public, max-age=31536000, immutable',
    //                 },
    //             ],
    //         },
    //         {
    //             source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp)',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'public, max-age=31536000, immutable',
    //                 },
    //             ],
    //         },
    //     ];
    // },

    // Vercel 배포를 위한 설정 (assetPrefix, basePath 제거)
    // assetPrefix: process.env.NODE_ENV === 'production' ? '/artinus-frontend-assignment' : '',
    // basePath: process.env.NODE_ENV === 'production' ? '/artinus-frontend-assignment' : '',
};

module.exports = withBundleAnalyzer(nextConfig);