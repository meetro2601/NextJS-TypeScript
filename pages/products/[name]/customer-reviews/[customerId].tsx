import { useRouter } from 'next/router'
import React from 'react'


function ProductReview() {

    const router = useRouter()

  return (
    <div className='p-5'>
        <h3>Product {router.query.name}</h3>
        <h5>Review {router.query.customerId}</h5>
    </div>
  )
}

export default ProductReview