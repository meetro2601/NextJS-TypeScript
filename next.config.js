/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async ()=>{
    return [
      // {
      //   source:"/posts",
      //   destination:"/",
      //   permanent:false
      // },
      {
        source:"/products/:name/reviews/:customerId",
        destination:"/products/:name/customer-reviews/:customerId",
        permanent:true
      },
    ]
  }
}

module.exports = nextConfig
