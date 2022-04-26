import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { postsType } from '.'

type props = {
  postdetail:postsType
}

const Posts:NextPage<props>= (props:props)=>{

  const router = useRouter()
  
  if(router.isFallback){
    return (
      <div className='p-5 text-xl'>
        <h5>Loading post details...</h5>
      </div>
    )
  }

    return <div className='p-5 text-xl'>
      <span className='mr-2'>Id:{props.postdetail.id}</span>
      <span>User:{props.postdetail.userId}</span>
      <h5 className='my-3'>Title: {props.postdetail.title}</h5>
      <h5>Description: {props.postdetail.body}</h5>
    </div>
  
}

export default Posts

export const getStaticPaths = async ()=>{
  // const resp = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  // const data = await resp.json()
  // data.map((post: postsType) => {
  //   return {
  //     params:{
  //       allRoutes:[`${post.id}`]
  //     }
  //   }
  // }),

  return {
    paths: [
      {
        params:{allRoutes:'1'}
      },
      {
        params:{allRoutes:'2'}
      },
      {
        params:{allRoutes:'3'}
      },
    ],
    fallback: true
  }
}

export const getStaticProps:GetStaticProps = async (context:GetStaticPropsContext)=>{
 let postid = context.params?.allRoutes
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`)
  const data = await resp.json()
  
  return {
    props: {
      postdetail : data
    }
  }
}