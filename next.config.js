/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
 default-src 'self';
 script-src 'self' 'unsafe-eval';
 script-src-elem 'self' https://www.google.com https://www.gstatic.com ;
 connect-src 'self' ${process.env.SERVER};
 img-src 'self' ${process.env.SERVER} data:;
 style-src 'self' 'unsafe-inline';
 base-uri 'self';
 form-action 'self';
 media-src 'self' ${process.env.SERVER} www.youtube.com; 
 font-src 'self' fonts.gstatic.com fonts.googleapis.com; 
 frame-src 'self' ${process.env.SERVER} www.youtube.com https://www.google.com https://www.gstatic.com
 `;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: "default-src 'self'; script-src 'self' 'unsafe-eval';script-src-elem 'self' https://www.google.com https://www.gstatic.com ; connect-src 'self' http://localhost:5000 https://superfablabbhutan.bt; img-src 'self' https://superfablabbhutan.bt data:; style-src 'self' 'unsafe-inline'; base-uri 'self'; form-action 'self'; media-src 'self' superfablabbhutan.bt www.youtube.com; font-src 'self' fonts.gstatic.com fonts.googleapis.com; frame-src 'self' superfablabbhutan.bt www.youtube.com https://www.google.com https://www.gstatic.com",
  // },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "th.bing.com",
      "202.144.132.98",
      "superfablabbhutan.bt",
      "localhost",
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
