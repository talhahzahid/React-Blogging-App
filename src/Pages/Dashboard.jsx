import React from 'react'

const Dashboard = () => {
  const render = (event) =>{
    event.preventDefault();
    console.log('hello');    
  }
  return (
    <>
    <h1 className=" m-5 mt-3 text-2xl">DashBoard</h1>
<div className="flex flex-col items-center justify-center ">
  <form onSubmit={render} className="w-full max-w-xs">
    <input 
      type="text" 
      placeholder="Title" 
      className="input input-bordered  w-full mb-4" 
    />
    <textarea 
      cols="100" 
      rows="5" 
      placeholder="What is on your mind" 
      className="border border-neutral-300 p-4 w-full mb-4" 
    ></textarea>
    <button className="btn btn-primary ">Publish Blog</button>
  </form>
</div>
    </>
  )
}

export default Dashboard