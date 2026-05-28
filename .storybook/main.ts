import type { StorybookConfig } from '@storybook/nextjs-vite';
import { existsSync } from 'node:fs';

const staticDirs = existsSync('public') ? ['../public'] : [];

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs,
};
export default config;
