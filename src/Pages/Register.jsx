import React from 'react'
import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';




const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();
  
  const registerUser = async (data) => {
    console.log(data);  
    createUserWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    navigate("/dashboard")
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
    
  }
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
      <input  type="email" placeholder="Email" className="input input-bordered input-neutral w-full"
        {...register("email", { required: true })}
      />
      {errors.email && <span className='text-error text-sm'>This field is required</span>}
      <input  type="password"  placeholder="Password"  className="input input-bordered input-neutral w-full"
        {...register("password", { required: true })}
      />
      {errors.password && <span className='text-error text-sm'>This field is required</span>}
      <button className="btn btn-primary w-full">Register</button>
    </form>
  </div>
</div>
    </>
  )
}

export default Register

          {/* <input type="file" placeholder="Password" className="file-input w-full max-w-xs input-bordered mb-4 block " 
            {...register("file", { required: true })}/> */}