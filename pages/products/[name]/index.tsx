import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { DataObj } from '../../api/products'

const ProductDetail:NextPage<{detail:DataObj}> = ({detail}:{detail:DataObj})=>{

  return (
    <>
    <Head>
        <title>Products - {detail.name}</title>
      </Head>
    <div className='p-5'>
      <h4 className='text-2xl'>Product Detail for product {detail.name}</h4>
      <h4 className='text-2xl'>Price : {detail.price}</h4>
      </div>
    </>
  )
}

export default ProductDetail

export const getStaticPaths:GetStaticPaths =async () => {
  const res = await fetch(`http://localhost:3000/api/products`)
  const data = await res.json()

  return {
    paths : data.map((item:DataObj) => {
      return {
        params: {name:item.name}
      }
    }),
    fallback:false
  }
}
export const getStaticProps:GetStaticProps = async (context:GetStaticPropsContext)=>{
  const {params} = context

  /* const data = products.find(
    (product) => product.name === params?.name
  ); */
  const res = await fetch(`http://localhost:3000/api/products/${params?.name}`)
  const data = await res.json()
  
  if(!data){
    return {
      notFound:true
    }
  }

  return {
    props:{
      detail:data
    }
  }
}
