import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
// import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { DataObj } from "../api/products";

const Productslist: NextPage<{ allProducts: DataObj[] | string}> = ({
  allProducts,
}: {
  allProducts: DataObj[] | string;
}) => {
  const [edit, setedit] = useState(false);
  const [products, setproducts] = useState<DataObj[] | string>(allProducts);
  const [product, setproduct] = useState<DataObj | undefined>({
    name: "",
    price: 0,
  });

  // const { data:session, status } = useSession();
  // console.log({session,status})

  /* const fetchproducts = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()

    const res = await fetch('http://localhost:3000/api/products')
    const data = await res.json()
    setproducts(data)
  } */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "price") {
      return setproduct({ ...product, [name]: Number(value) });
    }
    setproduct({ ...product, [name]: value });
  };

  const addProduct = async () => {
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setproduct({
      name: "",
      price: 0,
    });
     setproducts(data);
  };

  const handleDelete = async (name: string | undefined) => {
    const res = await fetch(`http://localhost:3000/api/products/${name}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setproducts(data);
  };

  // const 
  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:3000/api/products/${product?.name}`,
      {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setproducts(data);
    setedit(false)
    setproduct({
      name: "",
      price: 0,
    })
  };

  return (
    <>
    <Head>
        <title>Products</title>
      </Head>
    <div className="p-5">
      <h3 className="font-semibold text-3xl py-3">Products List</h3>
      {/* <button onClick={fetchproducts} className="bg-pink-700 text-white p-3">Fetch</button> */}
      <ol className="list-decimal">
        {typeof products !== 'string' ? products.map((product, index) => {
          return (
            <li key={index} className="my-3">
              <Link href={`/products/${product.name}`}>
                <a>
                  Product:{product.name} | Price: {product.price}
                </a>
              </Link>
              <button
                className="p-2 mx-2 bg-yellow-500"
                onClick={() => handleDelete(product.name)}
              >
                Delete
              </button>
              <button
                className="p-2 mx-2 bg-yellow-400"
                onClick={() => {setproduct(product);setedit(true)}}
              >
                Edit
              </button>

            </li>
          );
        }) : products}
      </ol>
      <input
        type="text"
        onChange={handleChange}
        value={product?.name}
        name="name"
        placeholder="product name"
        className="border-2 border-black m-3 p-1"
      ></input>
      <input
        type="text"
        onChange={handleChange}
        value={product?.price}
        name="price"
        placeholder="product price"
        className="border-2 border-black m-3 p-1"
      ></input>
      {
        edit ? 
        <button
        className="p-2 mx-2 bg-yellow-400"
        onClick={handleUpdate}
        >
        Update
      </button> : 
      <button onClick={addProduct} className="bg-indigo-600 text-white p-3">
        Add
      </button>
      }
    </div>
    </>
  );
};

export default Productslist;

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const username = process.env.AUTH_USERNAME
  const password = process.env.AUTH_PASSWORD
  // console.log(`User: ${username} && Password: ${password}`)

  const session = await getSession(context)
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  if(!session){
    return {
      redirect:{
        destination:"/api/auth/signin?callbackUrl=http://localhost:3000/products",
        permanent:false
      }
    }
  }

  return {
    props: {
      session,
      allProducts: session ? data : 'All Products',
    },
  };
};
