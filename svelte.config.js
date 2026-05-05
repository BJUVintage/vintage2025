import adapter from '@sveltejs/adapter-static';

const rawBasePath = (process.env.BASE_PATH ?? '').trim();
const cleanedBasePath = rawBasePath.replace(/^\/+|\/+$/g, '');
const basePath = cleanedBasePath ? `/${cleanedBasePath}` : '';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false
    }),
    paths: {
      base: basePath
    },
    prerender: {
      entries: ['*']
    }
  }
};
