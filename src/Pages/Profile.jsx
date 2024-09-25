import React from 'react'
import { auth } from '../Config/firebase/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth'

const Profile = () => {


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
 <>
     <h1 className="text-center mt-3 text-2xl">Profile</h1> 
 </>
  )
}

export default Profile