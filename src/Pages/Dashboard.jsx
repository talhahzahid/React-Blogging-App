import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from '../Config/firebase/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Config/firebase/firebaseconfig';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [uid, setUid] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        console.log("User UID:", user.uid);
        getData(user.uid);
      } else {
        console.log("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const getData = async (userId) => {
    if (!userId) return;
    const q = query(collection(db, "Blogs"), where("userId", "==", userId));
    try {
      const querySnapshot = await getDocs(q);
      const userBlog = [];
      querySnapshot.forEach((doc) => {
        userBlog.push({ id: doc.id, ...doc.data() });
      });
      setData(userBlog);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await deleteDoc(doc(db, "Blogs", id));
      console.log("Item Delete");
      if (uid) getData(uid);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const render = async (formData) => {
    if (!uid) return;

    const addData = async () => {
      try {
        const docRef = await addDoc(collection(db, "Blogs"), {
          Title: formData.Title,
          mind: formData.mind,
          userId: uid,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };
    await addData();
    reset();
    getData(uid);
  };

  return (
    <>
      <h1 className="m-5 mt-3 text-2xl font-bold">DashBoard</h1>
      <div className="flex flex-col items-center justify-center ">
        <form onSubmit={handleSubmit(render)} className="w-full max-w-xs">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full mb-4"
            {...register("Title", { required: true })}
          />
          {errors.Title && <span className="text-red-500">This field is required</span>}
          <textarea
            cols="100"
            rows="5"
            placeholder="What is on your mind"
            className="border border-neutral-300 p-4 w-full mb-4"
            {...register("mind", { required: true })}
          ></textarea>
          {errors.mind && <span className="text-red-500">This field is required</span>} <br />
          <button className="btn btn-primary">Publish Blog</button>
        </form>
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className='text-center text-3xl font-bold mb-4 mt-5'>Blogs</h1>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
              <p className="text-gray-700">{item.mind}</p>
              <button className='btn btn-error mt-4 m-2' onClick={() => deleteBlog(item.id)}>Delete</button>
            </div>
          ))
        ) : (
          <h1 className="text-center text-lg text-gray-500">Add A Blog</h1>
        )}
      </div>
    </>
  );
};

export default Dashboard;

