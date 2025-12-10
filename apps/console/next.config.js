//@ts-check

const webpack = require('webpack');
const { composePlugins, withNx } = require('@nx/next');

const isCloudEdition = process.env.SMALLBIZNIS_EDITION === "cloud";

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
  async redirects() {
    if (isCloudEdition) {
      return [];
    }

    return [
      {
        source: '/internal-admin/:path*',
        destination: '/license/error',
        permanent: false,
      },
    ];
  },
  webpack: (config) => {
    if (!isCloudEdition) {
      config.plugins = config.plugins || [];
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /internal-admin/ }));
    }
    return config;
  },
};

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
