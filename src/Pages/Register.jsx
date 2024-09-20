import React from 'react'
import { useForm } from "react-hook-form"

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <>
      <h1 className="text-center mt-5 text-2xl">Register</h1>
      <div className="flex items-center justify-center h-[80vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          <input type="text" placeholder="First Namee" className="input input-bordered input-neutral w-full max-w-xs mb-4 block"
            {...register("FirstNamee", { required: true })} />
          {errors.FirstNamee && <span className='text-error'>This field is required</span>}
          <input type="text" placeholder="Last Name" className="input input-bordered input-neutral w-full max-w-xs mb-4 block"
            {...register("LastName", { required: true })} />
          {errors.LastName && <span className='text-error'>This field is required</span>}
          <input type="email" placeholder="Email" className="input input-bordered input-neutral w-full max-w-xs mb-4 block"
            {...register("email", { required: true })} />
          {errors.email && <span className='text-error'>This field is required</span>}
          <input type="password" placeholder="Password" className="input input-bordered input-neutral w-full max-w-xs mb-4 block" 
            {...register("password", { required: true })}/>
          {errors.password && <span className='text-error'>This field is required</span>}
          <input type="file" placeholder="Password" className="file-input w-full max-w-xs input-bordered mb-4 block " 
            {...register("file", { required: true })}/>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>

    </>
  )
}

export default Register