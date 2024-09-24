import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../Config/firebase/firebaseconfig';

const Dashboard = () => {
  const [data, setData] = useState([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const render = (data) => {
    console.log(data);
    setData((prevData) => [...prevData, data]);
    const addData = async () =>{
      try {
        const docRef = await addDoc(collection(db, "Blogs"), {
          Title: data.Title,
          mind: data.mind,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    addData()
    reset();
  }
  return (
    <>
      <h1 className=" m-5 mt-3 text-2xl font-bold">DashBoard</h1>
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
        data.length > 0 ? data.map((item, index) => {
          return <div key={index} >
            <div className='flex justify-center m-5 '>
              <div className="card  bg-gray-100 w-[70rem] shadow-xl ">
                <div className="card-body">
                  <h2 className="card-title">{item.Title}</h2>
                  <p>{item.mind}</p>
                </div>
              </div>
            </div>
          </div>
        }) : <h1 className='text-center mt-5 text-2xl'>No Blog Founds</h1>
      }

    </>
  )
}

export default Dashboard