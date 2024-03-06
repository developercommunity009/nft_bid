/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    // domains: [
    //   'storage.googleapis.com',
    //   'lh1.googleusercontent.com',
    //   'lh2.googleusercontent.com',
    //   'lh3.googleusercontent.com',
    //   'lh4.googleusercontent.com',
    //   'lh5.googleusercontent.com',
    //   'lh6.googleusercontent.com',
    // ],
    domains:["https://nft-bid.vercel.app","codevvertix-nftmarketplace.infura-ipfs.io","lh3.googleusercontent.com"],
    // domains:["codevvertix-nftmarketplace.infura-ipfs.io"],
    formats:["image/webp"],
  }, 
}

module.exports = nextConfig
