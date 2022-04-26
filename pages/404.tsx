import React, { ReactElement } from 'react'

function ErrorPage() {
  return (
    <div className='text-center my-12 text-4xl fw-bold'>404 Custom ErrorPage</div>
  )
}

export default ErrorPage

ErrorPage.getLayout = function Pagelayout(page:ReactElement){
  return (
    <>
    {page}
    </>
  )
}