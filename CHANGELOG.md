## [2.10.1](https://github.com/raydot/dave-kanter-com/compare/v2.10.0...v2.10.1) (2026-09-13)


### Bug Fixes

* raise contrast on blog post filename label ([6be1d2c](https://github.com/raydot/dave-kanter-com/commit/6be1d2c848986d1b40e6643c26c795b0db0d5c86)), closes [#252c34](https://github.com/raydot/dave-kanter-com/issues/252c34)
* repair broken tw-prose typography modifiers on blog posts ([4054a01](https://github.com/raydot/dave-kanter-com/commit/4054a01f42995121258c77864fb59100199a8088))
* restore keyboard focus indicator on admin sign-out button ([51df4de](https://github.com/raydot/dave-kanter-com/commit/51df4de9bb5d3ac38c9f8753912067ead42339ce))

# [2.10.0](https://github.com/raydot/dave-kanter-com/compare/v2.9.0...v2.10.0) (2026-09-12)


### Features

* add sign-out to the admin nav ([06901af](https://github.com/raydot/dave-kanter-com/commit/06901af52fb969996e77b41c7cf07b929ae55045))

# [2.9.0](https://github.com/raydot/dave-kanter-com/compare/v2.8.4...v2.9.0) (2026-09-12)


### Bug Fixes

* emit post-specific social metadata and harden post JSON-LD ([1b5d09b](https://github.com/raydot/dave-kanter-com/commit/1b5d09b2d8cbcbbe7b9dd7837eac4ab2579ee62d))
* enforce publish filter in getPostBySlug ([4e87393](https://github.com/raydot/dave-kanter-com/commit/4e873931b9ba5a365f7946348d0c31e57339e2b2))
* move devIndicators out of experimental in next.config.js ([97aa4ce](https://github.com/raydot/dave-kanter-com/commit/97aa4ce550de296d2795de574b49f81e1ce2a37b))
* purge cached blog paths after post create, update and delete ([bb04155](https://github.com/raydot/dave-kanter-com/commit/bb0415501d864bff4b467637b54c12d5f5cc6d16))
* require admin auth on posts/tags API routes ([60ada96](https://github.com/raydot/dave-kanter-com/commit/60ada96948147a9049c94ada11e81105fe00d582))
* require admin auth on WebAuthn registration routes ([44a18e3](https://github.com/raydot/dave-kanter-com/commit/44a18e3e73c993962cf0fa9c38ff9aa53e6fe60d))
* revalidate the blog index hourly ([24b1553](https://github.com/raydot/dave-kanter-com/commit/24b155343a7b724dac707b1dd9fd1268ea5461ca))
* surface Supabase errors instead of caching empty blog results ([7d954aa](https://github.com/raydot/dave-kanter-com/commit/7d954aab3efd69124e128ea85559113641abe211))


### Features

* add canonical URLs and article OpenGraph metadata ([57f2fdd](https://github.com/raydot/dave-kanter-com/commit/57f2fdda26aa140fbe301f86b63929a25c7f7695))
* add dev.to syndication export route ([42e0c30](https://github.com/raydot/dave-kanter-com/commit/42e0c3078448adb54f4e9243c1463c0e7bc4ffd4))
* add dynamic sitemap.xml via App Router sitemap convention ([986396c](https://github.com/raydot/dave-kanter-com/commit/986396cda8add4a8747e020314ecd37597dd6f17))
* add JSON-LD structured data to blog post pages ([244a8e4](https://github.com/raydot/dave-kanter-com/commit/244a8e4bbe43ffcca1305d0417406487acd424bf))
* add OG image generation for blog post pages ([473c9d9](https://github.com/raydot/dave-kanter-com/commit/473c9d9e0254aceae82f9964f6670de53e3287b4))
* add RSS feed via App Router route handler ([8a9be19](https://github.com/raydot/dave-kanter-com/commit/8a9be19df475b7159e4467148d557e1494d31cc7))
* add semantic h1 and fix heading hierarchy on post page ([3fdf5bb](https://github.com/raydot/dave-kanter-com/commit/3fdf5bb60587cabdc7d4c07d125a649639dbbf26))
* enable ISR for blog post pages and sitemap ([2df7bed](https://github.com/raydot/dave-kanter-com/commit/2df7bed805951cb23a8119c75b11221aa4be9329))
* generate robots.txt via App Router robots convention ([34865f3](https://github.com/raydot/dave-kanter-com/commit/34865f3d3ba917841c0f35328744e8bc0355f39b))
* record syndication targets per post in the admin editor ([fd23e5d](https://github.com/raydot/dave-kanter-com/commit/fd23e5d2a95cee7c1bc46833d5ca7181df191f1e))

## [2.8.4](https://github.com/raydot/dave-kanter-com/compare/v2.8.3...v2.8.4) (2026-01-04)


### Bug Fixes

* use double quotes in YAML frontmatter to avoid escape sequence errors ([8d454ad](https://github.com/raydot/dave-kanter-com/commit/8d454ade872265115987c4d87f075a8d2468f43c))

## [2.8.3](https://github.com/raydot/dave-kanter-com/compare/v2.8.2...v2.8.3) (2026-01-04)


### Bug Fixes

* convert tags to inline YAML syntax ([9c6e9ae](https://github.com/raydot/dave-kanter-com/commit/9c6e9aefbbb3ab3e26c3cd685dc3d9beee42faa5))

## [2.8.2](https://github.com/raydot/dave-kanter-com/compare/v2.8.1...v2.8.2) (2026-01-04)


### Bug Fixes

* remove trailing whitespace in going-ape frontmatter ([8c08544](https://github.com/raydot/dave-kanter-com/commit/8c08544868965a493a5333a0493178be27e3c1f8))

## [2.8.1](https://github.com/raydot/dave-kanter-com/compare/v2.8.0...v2.8.1) (2026-01-04)


### Bug Fixes

* correct YAML frontmatter formatting in ethics post ([e4ffcae](https://github.com/raydot/dave-kanter-com/commit/e4ffcae1ce40cc77c04cd0f3c42d954efae07a74))

# [2.8.0](https://github.com/raydot/dave-kanter-com/compare/v2.7.2...v2.8.0) (2026-01-04)


### Features

* publish going-ape blog post and add draft filtering ([ed2c580](https://github.com/raydot/dave-kanter-com/commit/ed2c580d0dd0f0bc2daf91b05c2d1c4d8005f53a))

## [2.7.2](https://github.com/raydot/dave-kanter-com/compare/v2.7.1...v2.7.2) (2025-12-15)


### Bug Fixes

* added title to blog. ([853beb0](https://github.com/raydot/dave-kanter-com/commit/853beb0e21d3ca5c68e2957ebb9fd4cfef41f9b3))

## [2.7.1](https://github.com/raydot/dave-kanter-com/compare/v2.7.0...v2.7.1) (2025-12-15)


### Bug Fixes

* updated the blog post for the last time. ([84c0bb6](https://github.com/raydot/dave-kanter-com/commit/84c0bb61b8286179e9f9192ba0899fafeb558927))

# [2.7.0](https://github.com/raydot/dave-kanter-com/compare/v2.6.4...v2.7.0) (2025-12-15)


### Features

* add blog and accessibility content to chatbot context ([c25475b](https://github.com/raydot/dave-kanter-com/commit/c25475bb7f328bb5f5bdf2a979809c0f70b80e4a))

## [2.6.4](https://github.com/raydot/dave-kanter-com/compare/v2.6.3...v2.6.4) (2025-12-15)


### Bug Fixes

* finalize contact form recipient as Gmail address ([090fc39](https://github.com/raydot/dave-kanter-com/commit/090fc397641ba1ab8460d1b60bd14b030f11a0db))

## [2.6.3](https://github.com/raydot/dave-kanter-com/compare/v2.6.2...v2.6.3) (2025-12-15)


### Bug Fixes

* improve blog title hover visibility with opacity instead of dark color ([654c12b](https://github.com/raydot/dave-kanter-com/commit/654c12b8c7b707a73cbc05c48df3695aff39cdc8))
* improve blog title hover visibility with opacity instead of dark color ([e015dc1](https://github.com/raydot/dave-kanter-com/commit/e015dc10920e4ea57d8092516d7f026db4b6c690))

## [2.6.2](https://github.com/raydot/dave-kanter-com/compare/v2.6.1...v2.6.2) (2025-12-15)


### Bug Fixes

* add detailed error logging for rate limiting and API failures ([2f9d65f](https://github.com/raydot/dave-kanter-com/commit/2f9d65f904a5c6da6dd17033924ae5dce838d553))

## [2.6.1](https://github.com/raydot/dave-kanter-com/compare/v2.6.0...v2.6.1) (2025-12-15)


### Bug Fixes

* improve blog color contrast for accessibility ([50ced88](https://github.com/raydot/dave-kanter-com/commit/50ced88bbbbb5058f36a85ebf3c0864ded6b03d6)), closes [#dcdcdc](https://github.com/raydot/dave-kanter-com/issues/dcdcdc)

# [2.6.0](https://github.com/raydot/dave-kanter-com/compare/v2.5.3...v2.6.0) (2025-12-14)


### Features

* comprehensive accessibility improvements for AskDave AI chat ([8b124d4](https://github.com/raydot/dave-kanter-com/commit/8b124d4d0da697a963f4e33761679b617eea3a0c))

## [2.5.3](https://github.com/raydot/dave-kanter-com/compare/v2.5.2...v2.5.3) (2025-12-14)


### Bug Fixes

* improve landing page layout and navigation ([a87659b](https://github.com/raydot/dave-kanter-com/commit/a87659b98e20c6230afc4725a5c20c2ecbd86b99))
* improve landing page layout and navigation ([3dd7d12](https://github.com/raydot/dave-kanter-com/commit/3dd7d124e3f42f5b9e7f8efbe45ed09b18232317))

## [2.5.2](https://github.com/raydot/dave-kanter-com/compare/v2.5.1...v2.5.2) (2025-12-14)


### Bug Fixes

* simplify robots.txt to work with Cloudflare managed content ([ec644d2](https://github.com/raydot/dave-kanter-com/commit/ec644d200f4daa3edfae6fd11937919e112658ee))

## [2.5.1](https://github.com/raydot/dave-kanter-com/compare/v2.5.0...v2.5.1) (2025-12-14)


### Bug Fixes

* update CSP to allow Cloudflare Insights and remove deprecated swcMinify ([4e95ab2](https://github.com/raydot/dave-kanter-com/commit/4e95ab29d1d202bb71f3ed86b8e8ca9b1fc7b02b))

# [2.5.0](https://github.com/raydot/dave-kanter-com/compare/v2.4.0...v2.5.0) (2025-12-14)


### Features

* add security headers, fix robots.txt, optimize JavaScript bundle ([ca542eb](https://github.com/raydot/dave-kanter-com/commit/ca542eb85fcaea7db9ad5d59176515f9165ef54d))

# [2.4.0](https://github.com/raydot/dave-kanter-com/compare/v2.3.0...v2.4.0) (2025-12-14)


### Features

* upgrade to Next.js 16 LTS and resolve CVE-2025-66478 ([df53079](https://github.com/raydot/dave-kanter-com/commit/df53079147bc21f903deb5f6e8f9ed740d55def5))

# [2.3.0](https://github.com/raydot/dave-kanter-com/compare/v2.2.1...v2.3.0) (2025-11-10)


### Features

* add blog infrastructure with MDX and shadcn/ui ([f353b92](https://github.com/raydot/dave-kanter-com/commit/f353b92adc980bd76c227ba028603fc6ac497e63))
* add blog navigation and SEO metadata ([bbe040d](https://github.com/raydot/dave-kanter-com/commit/bbe040d1a0bc8252e62f5b29ae13124902507eae))
* enhance blog styling and mobile responsiveness ([2bcbc61](https://github.com/raydot/dave-kanter-com/commit/2bcbc616d3ef37f542b76f115c7d7b128b9500df))
* implement core blog infrastructure ([57ae30f](https://github.com/raydot/dave-kanter-com/commit/57ae30f86c3c9b2227146e722e6de1f90e82bbb1))

## [2.2.1](https://github.com/raydot/dave-kanter-com/compare/v2.2.0...v2.2.1) (2025-11-09)


### Bug Fixes

* remove secret values from deployment documentation ([f3626cd](https://github.com/raydot/dave-kanter-com/commit/f3626cd99e5548f263a453104092877462f208c1))

# [2.2.0](https://github.com/raydot/dave-kanter-com/compare/v2.1.3...v2.2.0) (2025-11-09)


### Features

* migrate from static export to Netlify Next.js runtime ([86cd483](https://github.com/raydot/dave-kanter-com/commit/86cd483a8a8e7a79db4cf53433ed519912d27e9e))

## [2.1.3](https://github.com/raydot/dave-kanter-com/compare/v2.1.2...v2.1.3) (2025-11-09)


### Bug Fixes

* updated the AskDave context page. ([6cff7a1](https://github.com/raydot/dave-kanter-com/commit/6cff7a12187476c75950b0f06b725086bf4470a7))

## [2.1.2](https://github.com/raydot/dave-kanter-com/compare/v2.1.1...v2.1.2) (2025-11-09)


### Bug Fixes

* escape quotes in AskDave and improve SEO metadata ([57a1fd9](https://github.com/raydot/dave-kanter-com/commit/57a1fd9ba2e46a1d527c46f7200bc822b7ca989c))

## [2.1.1](https://github.com/raydot/dave-kanter-com/compare/v2.1.0...v2.1.1) (2025-11-09)


### Bug Fixes

* escape quites in AskDave component for ESLint ([d79a5ce](https://github.com/raydot/dave-kanter-com/commit/d79a5ce3c4c06f398822607e7ffcf26b32fd58eb))

# [2.1.0](https://github.com/raydot/dave-kanter-com/compare/v2.0.0...v2.1.0) (2025-11-09)


### Features

* add AI assistant dave.ask() widget with Claude integration ([2e55c5e](https://github.com/raydot/dave-kanter-com/commit/2e55c5e109799b05a17604244d9630fb5a339cfd))

# 1.0.0 (2025-11-08)


### Features

* add semantic-release automation ([b287294](https://github.com/raydot/dave-kanter-com/commit/b2872943311e811d178a5904ecfbab87fa5588be))
