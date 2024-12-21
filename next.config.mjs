/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000', // Specify the port your server is running on
                pathname: '/uploads/**', // Adjust the path to match your server's image path
            },
        ],
    },
};

export default nextConfig;
