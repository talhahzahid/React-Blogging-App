import React from 'react'

const Register = () => {
  return (
<>
<h1 className="text-center mt-5 text-2xl">Register</h1>
<div class="flex items-center justify-center h-[70vh]">
  <form class="text-center">
    <input type="text" placeholder="First Name" className="input input-bordered input-neutral w-full max-w-xs mb-4 block" />
    <input type="text" placeholder="Last Name" className="input input-bordered input-neutral w-full max-w-xs mb-4 block" />
    <input type="email" placeholder="Email" className="input input-bordered input-neutral w-full max-w-xs mb-4 block" />
    <input type="password" placeholder="Password" className="input input-bordered input-neutral w-full max-w-xs mb-4 block" />
    <input type="file" placeholder="Password" className="file-input w-full max-w-xs input-bordered mb-4 block " />
    <button className="btn btn-primary">Register</button>
  </form>
</div>

</>
  )
}

export default Register