import React from 'react'
import { useForm } from "react-hook-form"


const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <>
        <h1 className="text-center mt-5 text-2xl ">Login</h1>
        <div className="flex items-center justify-center h-[80vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          <input type="email" placeholder="Email" className="input input-bordered input-neutral w-full max-w-xs mb-4 block"
            {...register("email", { required: true })} />
          {errors.email && <span className='text-error text-sm'>This field is required</span>}
          <input type="password" placeholder="Password" className="input input-bordered input-neutral w-full max-w-xs mb-4 block" 
            {...register("password", { required: true })}/>
          {errors.password && <span className='text-error text-sm '>This field is required</span>} <br />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login