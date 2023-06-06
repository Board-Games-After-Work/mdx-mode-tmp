const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx", "toml"],
    reactStrictMode: true,
};

module.exports = withMDX(nextConfig);
