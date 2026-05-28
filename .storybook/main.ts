import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/nextjs-vite',

  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), svgr({ include: /\.svg$/ })];

    config.plugins = config.plugins?.flat().map((plugin) => {
      if (
        plugin &&
        typeof plugin === 'object' &&
        'name' in plugin &&
        plugin.name === 'vite-plugin-storybook-nextjs-image'
      ) {
        return {
          ...plugin,
          resolveId(id: string, importer?: string) {
            if (id.endsWith('.svg')) return null;
            return (
              plugin as { resolveId?: (id: string, importer?: string) => unknown }
            ).resolveId?.(id, importer);
          },
        };
      }
      return plugin;
    });

    return config;
  },
};

export default config;
