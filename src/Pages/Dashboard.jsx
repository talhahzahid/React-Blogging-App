import React, { useState , useEffect } from 'react'
import { useForm } from "react-hook-form"
import { collection,  addDoc} from "firebase/firestore"; 
import {  getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Config/firebase/firebaseconfig';

const Dashboard = () => {
  // const [data, setData] = useState([])
  const [data, setData] = useState([])  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()








  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "Blogs"));
    const userBlog = []
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
      // userBlog.push( {...doc.data() , id: doc.id()});
      userBlog.push({ id: doc.id, ...doc.data() }); // Include the document ID
      setData(userBlog)
    });
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteBlog = async (id) => {
    try {
      await deleteDoc(doc(db, "Blogs", id));
      console.log("Document successfully deleted!");
      getData(); // Refresh data after deleting
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };



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
      {/* {
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
      } */}



<div className="max-w-2xl mx-auto p-4">
        <h1 className='text-center text-3xl font-bold mb-4 mt-5'>Blogs</h1>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
              <p className="text-gray-700">{item.mind}</p>
              <button className='btn btn-success mt-4 m-2'>Edit</button>
              <button className='btn btn-error mt-4 m-2'onClick={() => deleteBlog(item.id)}>Delete</button>
            </div>
          ))
        ) : (
          <h1 className="text-center text-lg text-gray-500"><span className="loading loading-spinner loading-lg"></span>
          </h1>
        )}
      </div>



    </>
  )
}

export default Dashboard