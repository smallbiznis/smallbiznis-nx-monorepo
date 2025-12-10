//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  nx: {},
};

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
