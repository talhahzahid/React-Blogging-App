
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Config/firebase/firebaseconfig';


const Home = () => {

  const [data, setData] = useState([])
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "Blogs"));
    const userBlog = []
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
      userBlog.push(doc.data());
      setData(userBlog)
    });
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className='text-center text-3xl font-bold mb-4 mt-5'>Blogs</h1>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
              <p className="text-gray-700">{item.mind}</p>
            </div>
          ))
        ) : (
          <h1 className="text-center text-lg text-gray-500"><span className="loading loading-spinner loading-lg"></span>
          </h1>
        )}
      </div>


    </>
  );
}

export default Home;
