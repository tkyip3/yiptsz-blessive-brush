import { withPayload } from '@payloadcms/next/withPayload'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev({})
}

const nextConfig = {
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    resolveExtensions: ['.cts', '.cjs', '.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yiptsz-blessive-brush.tkyip3.workers.dev',
      },
      {
        protocol: 'https',
        hostname: 'instagram.fhkg13-1.fna.fbcdn.net',
      },
    ],
  },
}

export default withPayload(nextConfig as any, { devBundleServerPackages: false })
