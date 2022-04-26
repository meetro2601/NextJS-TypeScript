import React from 'react'
import { postsType } from '../pages/posts'

type post ={
    post:postsType
}

const Post:React.FC<post> = ({post}:post)=>{
  return (
    <div className='p-3 bg-green-200 mb-2'>
    <h4>Id: {post.id}</h4>
    <p>Title: {post.title}</p>
  </div>
  )
}

export default Post