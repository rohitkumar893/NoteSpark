import { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://notespark-backend.onrender.com/api/auth/login", {
        email,
        password
      });

     if (res.data.success) {
        login({ name: res.data.user.name, id: res.data.user._id }, res.data.token);
        navigate('/');
    }
    else{
      alert(res.data.message)
    }
    }
    
    catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
        alert("User does not exist");
      } else {
        alert("User does not exist"); 
      }
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='justify-center items-center border-2 border-gray-400 rounded-xl w-[320px] h-[400px] p-6 flex flex-col gap-6 bg-white shadow-md'
      >
        <h2 className='text-center text-xl font-bold'>Login</h2>

        <div className='flex flex-col w-full items-center'>
          <label htmlFor='email' className='mb-1 font-medium w-[90%]'>E-mail</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            id='password'
            placeholder='Enter Password'
            className='padder w-[90%] border-2 border-gray-400 rounded-lg'
          />
        </div>

        <button
          type="submit"
          className='w-[90%] cursor-pointer h-[30px] font-semibold bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition'
        >
          LOG IN
        </button>

        <h2>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className='text-blue-400 font-medium cursor-pointer'>Signup</Link>
        </h2>
      </form>
    </div>
  );
};

export default Login;
