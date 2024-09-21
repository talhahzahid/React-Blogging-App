import React, { useState } from 'react'
import { useForm } from "react-hook-form"

const Dashboard = () => {
  const [data , setData] = useState([])
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const render = (data) =>{
    console.log(data);
    setData((prevData) => [...prevData, data]); 
    reset();    
  }
  return (
    <>
    <h1 className=" m-5 mt-3 text-2xl">DashBoard</h1>
<div className="flex flex-col items-center justify-center ">
  <form onSubmit={handleSubmit(render)} className="w-full max-w-xs">
    <input 
      type="text" 
      placeholder="Title" 
      className="input input-bordered  w-full mb-4" 
      {...register("Title", { required: true })}
    />
    {errors.Title && <span className="text-red-500">This field is required</span>}
    <textarea 
      cols="100" 
      rows="5" 
      placeholder="What is on your mind" 
      className="border border-neutral-300 p-4 w-full mb-4" 
      {...register("mind", { required: true })} ></textarea>
       {errors.mind && <span className="text-red-500">This field is required</span>} <br />
    <button className="btn btn-primary ">Publish Blog</button>
  </form>
</div>
{
  data.length > 0 ? data.map((item,index)=>{
    return <div key={index}>
      <p>{item.Title}</p>
      <p>{item.mind}</p>
      <hr />
    </div>
  }):<h1>No Blog Founds</h1>
}
    </>
  )
}

export default Dashboard