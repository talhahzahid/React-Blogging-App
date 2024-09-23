// import React from 'react'
// import {  signOut } from "firebase/auth";
// import { auth } from '../Config/firebase/firebaseconfig';

// const Home = () => {


// function LogOut(){
//   const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
// }

//   return (
//     <>
//     <h1 className="text-center mt-3 text-2xl">Home</h1>

//   <button onClick={LogOut}> sign out</button>

//     </>
//   )
// }

// export default Home


import React from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../Config/firebase/firebaseconfig';

const Home = () => {
  function LogOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error);
      });
  }

  return (
    <>
      <h1 className="text-center mt-3 text-2xl">Home</h1>
      <button onClick={LogOut}>Sign Out</button>
    </>
  );
}

export default Home;
