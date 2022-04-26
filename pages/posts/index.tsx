import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import React from 'react'
import Post from '../../components/Post';

export interface postsType {
  id:number;
  userId: number;
  title:string;
  body:string
}

export type propsType = {
  posts : [postsType]
}

const PostHome:NextPage<propsType> = (props:propsType)=>{

  return (
    <div className='p-5'><h2 className='text-5xl p-3 fw-bold'>Posts</h2>
    {
      props.posts.map(post =>{
        return (
          <Link key={post.id} href={`/posts/${post.id}`}><a>
            <Post post={post}></Post>
            </a></Link>
        )
      })
    }
    </div>
  )
}

export default PostHome

export const getStaticProps:GetStaticProps = async ()=>{
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await resp.json()

  return {
    props: {
      posts : data
    }
  }
}