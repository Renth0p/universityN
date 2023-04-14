const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const isSentryEnabled = process.env.NODE_ENV === 'production' && process.env.APP_ENV === 'PROD';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const cachePublicMaxAge = process.env.CACHE_PUBLIC_MAX_AGE ?? 3600;

/**
 * @type {import("next").NextConfig}
 */

const nextConfig = {
    sassOptions: {
        indentType: 'tab',
        style: 'compressed',
        includePaths: [path.join(__dirname, 'src/assets/styles')],
        charset: false,
    },
    swcMinify: true,
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
        esmExternals: 'loose',
        modularizeImports: {
            lodash: {
                transform: 'lodash/{{member}}',
            },
        },
    },
    images: {
        disableStaticImages: true,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    rewrites: async () => [
        {
            source: '/api/:path*',
            destination: process.env.BACK_INTERNAL_URL ?? '/api/:path*',
        },
    ],
    headers: async () => [
        {
            source: '/:all*(svg|jpg|png|jpeg|woff|woff2|webp|ico)',
            locale: false,
            headers: [
                {
                    key: 'Cache-Control',
                    value: `public, max-age=${cachePublicMaxAge}, stale-while-revalidate`,
                },
            ],
        },
    ],
};

module.exports = isSentryEnabled
    ? withSentryConfig(nextConfig, { silent: true })
    : withBundleAnalyzer(nextConfig);

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/profile',
                permanent: true,
            },
        ];
    },
    images: {
        domains: ['api.meatballs.w6p.ru'],
    },
};
