import Image from "next/image";
import Link from "next/link";                                   
import React from "react";
import imgA from "public/A.jpg";
import { useSession } from "next-auth/react";

function BlogsHome() {
  const { data: session } = useSession();
 
  if(!session){
    return <div className='p-5'>
      <h3>Access Denied</h3>
    </div>
  }

  return (
    <div className="p-5">
      Blogs Home
      <Link href="/blogs/create">
        <a className="block text-emerald-700">Create</a>
      </Link>
      <Image
        src={imgA}
        placeholder="blur"
        alt="blog-image"
        width={280}
        height={420}
      />
      {["A", "B", "C", "D", "E"].map((image, index) => {
        return (
          <div key={index}>
            {/* <img src={`/${image}.jpg`} alt='blog-image' width={280} height={420}></img> */}
            <Image
              src={`/${image}.jpg`}
              alt="blog-image"
              width={280}
              height={420}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BlogsHome;
