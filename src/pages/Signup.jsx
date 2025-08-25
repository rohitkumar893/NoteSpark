import { useState } from 'react';
import './Signup.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post("http://localhost:5000/api/auth/register",
        {name, email, password})
        if(res.data.success){
        navigate('/login')
      }
      }
      
      catch(err){
        console.log(err)
      }
    }

    
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='justify-center items-center border-2 border-gray-400 rounded-xl w-[320px] h-[400px] p-6 flex flex-col gap-6 bg-white shadow-md'>
        
        <h2 className='text-center text-xl font-bold'>Sign Up</h2>

        <div className='flex flex-col w-full items-center'>
          <label htmlFor='name' className='mb-1 font-medium w-[90%]'>Name</label>
          <input
            onChange = {(e) => setName(e.target.value)}
            value={name}
            type='text' 
            id='name' 
            placeholder='Enter Name'
            className='padder w-[90%] border-2 border-gray-400 rounded-lg'
          />
        </div>

        <div className='flex flex-col w-full items-center'>
          <label htmlFor='email' className='mb-1 font-medium w-[90%]'>E-mail</label>
          <input
            onChange = {(e) => setEmail(e.target.value)}
            value={email}
            type='email' 
            id='email' 
            placeholder='Enter E-mail' 
            className='padder w-[90%] border-2 border-gray-400 rounded-lg'
          />
        </div>

        <div className='flex flex-col w-full items-center'>
          <label htmlFor='password' className='mb-1 font-medium w-[90%]'>Password</label>
          <input
            onChange = {(e)=>setPassword(e.target.value)}
            value={password}
            type='password' 
            id='password' 
            placeholder='Enter Password' 
            className='padder w-[90%] border-2 border-gray-400 rounded-lg'
          />
        </div>

        <button className='w-[90%] cursor-pointer font-semibold h-[30px] bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition'>
          SIGN UP
        </button>

        <h2>Already have an account? <Link to="/Login" className='text-blue-400 font-medium'>Login</Link></h2>
      </form>
    </div>
  )
}

export default Signup;
