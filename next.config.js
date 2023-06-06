const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        providerImportSource: "@mdx-js/react",
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx", "toml"],
    reactStrictMode: true,
};

module.exports = withMDX(nextConfig);
