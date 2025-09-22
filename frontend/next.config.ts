import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack(config: Configuration) { // <-- type added here
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module && config.module.rules
      ? config.module.rules.find((rule: any) =>
          rule.test?.test?.('.svg')
        )
      : undefined;

    if (!fileLoaderRule) return config;

    // Add SVGR rule
    if (!config.module || !config.module.rules) {
      return config;
    }
    config.module.rules.push(
      {
        ...(typeof fileLoaderRule === 'object' && fileLoaderRule !== null ? fileLoaderRule : {}),
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: (typeof fileLoaderRule === 'object' && fileLoaderRule !== null && 'issuer' in fileLoaderRule)
          ? (fileLoaderRule as { issuer?: any }).issuer
          : undefined,
        resourceQuery: { 
          not: [
            ...(
              typeof fileLoaderRule === 'object' &&
              fileLoaderRule !== null &&
              'resourceQuery' in fileLoaderRule &&
              typeof fileLoaderRule.resourceQuery === 'object' &&
              fileLoaderRule.resourceQuery !== null &&
              'not' in fileLoaderRule.resourceQuery
                ? (fileLoaderRule.resourceQuery.not as RegExp[] || [])
                : []
            ),
            /url/
          ]
        },
        use: ['@svgr/webpack'],
      }
    );

    // Exclude SVGs from the file loader
    if (typeof fileLoaderRule === 'object' && fileLoaderRule !== null) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
