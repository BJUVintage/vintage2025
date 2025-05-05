import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or if you want to use a specific adapter like adapter-node or adapter-static,
    // you can specify it here.
    adapter: adapter()
  }
};

export default config;

