import React from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'


export const LinkChange = ({ item }) => {
    const { id } = useParams();
  
    return (
      <div>
        <h2>Name is: {item}</h2>
      </div>
    );
  };


// export const LinkChanger = async ({ params }) => {
//     const { id } = params
//     const res = await fetch("http://localhost:3000" + id)
//     return res.json()
// }
