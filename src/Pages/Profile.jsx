import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from '../Config/firebase/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Config/firebase/firebaseconfig';

const Profile = () => {

   const [data,setData] = useState(null)

  useEffect(() => {
    const  chechUser = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        await UserData(uid);
      } else {
        console.log("User Nistha");
      }
    });
    return () => chechUser();
  }, []);

  const UserData = async (uid) => {
    const q = query(collection(db, "User"), where("UserId", "==", uid)); 
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`); 
        console.log(doc.data());
        setData(doc.data())
      });
    } else {
      console.log("No user data found for this UID.");
    }
  };

  return (
    <>
      {/* <h1 className="text-center mt-3 text-2xl">Profile</h1> */}
      {data ? (
         <div className='flex items-center justify-center h-[80vh] flex-col gap-2' > 
           <h1 className='text-2xl'>Name: {data.FirstName}</h1>
           <h1 className='text-2xl'>Last Name: {data.LastName}</h1>
           <h1 className='text-2xl'>Email: {data.Email}</h1>
           <img style={{width:"14rem"}} className='border-rounded' src={data.ImageUrl} alt="" />
         </div>
       ) : (
         <h1 className='text-center justify-center'>Loading</h1>
       )}
    </>
  );
};

export default Profile;

