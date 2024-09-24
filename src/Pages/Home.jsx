
import React, { useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../Config/firebase/firebaseconfig';


const Home = () => {
 
  const [data , setData] = useState(null)

  const getData = async () =>{
    const querySnapshot = await getDocs(collection(db, "Blogs"));
querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} ${doc.data()}`);
  console.log(`${doc.id} =>`, doc.data());
  setData(...doc.data())
});
  }
  getData()

  return (
    <>
      <h1 className="text-center mt-3 text-2xl">Home</h1>
      {
        data ? data.map((item , index)=>{
          return <div key={index}>
            <p>{item.Title}</p>
            <p>{item.mind}</p>
          </div>
        }):<h1>Loading...</h1>
      }
    </>
  );
}

export default Home;
