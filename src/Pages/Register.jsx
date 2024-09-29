import React from 'react';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/firebase/firebaseconfig';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../Config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const registerUser = async (data) => {
    console.log(data);

    
    // Authentication user 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const file = data.profileImage[0]; 
      if (!file) {
        console.error("No file selected!");
        return;
      }

      const url = await uploadImage(file, `profile_images/${user.uid}/${file.name}`);
      if (url) {
        console.log("iamge done ", url);
        await addData({ ...data, imageUrl: url, userId: user.uid });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

//  using sir fuction 
  const uploadImage = async (file, path) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Data Add in Firebasa Finally 
  const addData = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "User"), {
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.email,
        ImageUrl: data.imageUrl,
        UserId: data.userId,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-[80vh] bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xs">
          <h1 className="text-center text-2xl font-bold mb-6">Register</h1>
          <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
            <input
              type="text" placeholder="First Name" className="input input-bordered input-neutral w-full"
              {...register("FirstName", { required: true })}
            />
            {errors.FirstName && <span className='text-error text-sm'>This field is required</span>}
            <input type="text" placeholder="Last Name" className="input input-bordered input-neutral w-full"
              {...register("LastName", { required: true })}
            />
            {errors.LastName && <span className='text-error text-sm'>This field is required</span>}
            <input type="email" placeholder="Email" className="input input-bordered input-neutral w-full"
              {...register("email", { required: true })}
            />
            {errors.email && <span className='text-error text-sm'>This field is required</span>}
            <input type="password" placeholder="Password" className="input input-bordered input-neutral w-full"
              {...register("password", { required: true })}
            />
            {errors.password && <span className='text-error text-sm'>This field is required</span>}
            <input type="file" className="file-input w-full max-w-xs input-bordered mb-4 block"
              {...register("profileImage", { required: true })} />
            {errors.profileImage && <span className='text-error text-sm'>This field is required</span>}
            <button className="btn btn-primary w-full">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
