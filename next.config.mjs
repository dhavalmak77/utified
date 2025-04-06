import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
	sassOptions: {
		includePaths: [path.join(process.cwd(), "styles")]
	}
};

export default nextConfig;
