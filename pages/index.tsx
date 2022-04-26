import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {

  const router = useRouter()

  // useEffect(() => {
  //  fetch('http://localhost:3000/api/products')
  //  .then(res => (res.json()))
  //  .then(data => console.log(data))
  // }, [])
  
  // Use NEXT_PUBLIC_ to send env variable to browser.
  return (
    <div className='p-4'>
      <h4 className='text-2xl'>Welcome, {process.env.NEXT_PUBLIC_CURRENT_USER}</h4> 
        <button onClick={()=>router.push('/posts')} className='m-3 p-2 bg-orange-400 hover:bg-slate-400'>Read Artciles</button>
       
      {/* <footer className=''>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className=''>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
