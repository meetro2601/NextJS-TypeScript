import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'

const about:NextPage<{data:string}> = ({data}:{data:string})=>{
  return (
    <div className='p-5'>
      <h2 className='text-4xl'>{data}</h2>
    </div>
  )
}

export default about

export const getStaticProps:GetStaticProps = (context:GetStaticPropsContext)=>{
  console.log(context.previewData)
  return {
    props:{
      data:context.preview ? 'Preview of About Page': 'Final About Page'
    }
  }
}