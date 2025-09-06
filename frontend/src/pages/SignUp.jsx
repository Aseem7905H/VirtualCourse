import React, {useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { HiOutlineEye } from 'react-icons/hi';
import { HiEye } from 'react-icons/hi';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';
 import { useDispatch } from 'react-redux';
 import { setUserData } from '../redux/userSlice.js';
import {ClipLoader } from 'react-spinners';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firbase.js';

function SignUp(props) {
  const [show , setShow] =   useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [role, setRole] = useState("student");
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   const handleSignup = async () => {
     if (!name || !email || !password) {
    toast.error("Please fill in all fields.");
    return;
  }
    try {
      setLoading(true);
      const result = await axios.post(serverUrl + "/api/auth/signUp", {
        name,
        email,
        password,
        role
      } , {withCredentials: true} ); 
      dispatch(setUserData(result.data.user));
       console.log(result);
       setLoading(false);
      navigate("/")
      toast.success("Signup successful!");

      console.log(result);
    }  catch (error) {
  console.error("Signup error:", error.response?.data || error.message);
  toast.error(error.response?.data?.message || "Signup failed. Please try again.");
} 
   }
const googleSignUp = async () => { 
  try {
    if (!role) {
      toast.error("Please select a role");
      return;
    }

    const response = await signInWithPopup(auth, provider);
    let user = response.user ;
    let name = user.displayName
   let email = user.email;

   const result = await axios.post(serverUrl + "/api/auth/googleauth", { name, email , role },{withCredentials:true} );
    dispatch(setUserData(result.data.user));

    navigate("/") 
    toast.success("Google Signup successful!");
    console.log(response);
  } catch (error) {
      toast.error("Google Signup failed. Please try again.");
    
  }
}
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex ' onSubmit={(e)=> e.preventDefault()}  >
         {/* left div */}
         <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 '>
       <div>
       <h1 className='font-semibold text-[black] text-2xl'>let's get started</h1>
        <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
       </div>
       <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>

      <label htmlFor="name" className='font-semibold'>Name</label>
        <input id='name' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your name' onChange={(e) => setName(e.target.value)} value={name} />
   </div>
     
   <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
      <label htmlFor="email" className='font-semibold'>Email</label>
      <input id='email' type="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your email' onChange={(e) => setEmail(e.target.value)} value={email} />
   </div>
       <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative '>

      <label htmlFor="password" className='font-semibold'>Password</label>
        <input id='password' type={show ? "text" : "password"} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your password' onChange={(e) => setPassword(e.target.value)} value={password} />   
        { show ? <HiOutlineEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev => !prev)}  /> :
        <HiEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev => !prev)} />
 } </div>

       <div className="flex w-[80%] items-center justify-between gap-4 px-3 mt-3 mb-3">
  <span
    className={`px-[15px] py-[8px] border-[2px] rounded-xl cursor-pointer transition-all duration-200 ${
      role === "student"
        ? "bg-black text-white border-black"
        : "bg-white text-black border-gray-400 hover:border-black"
    }`}
    onClick={() => setRole("student")}
  >
    Student
  </span>
  <span
    className={`px-[15px] py-[8px] border-[2px] rounded-xl cursor-pointer transition-all duration-200 ${
      role === "educator"
        ? "bg-black text-white border-black"
        : "bg-white text-black border-gray-400 hover:border-black"
    }`}
    onClick={() => setRole("educator")}
  >
    Educator
  </span>
</div>

    <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer gap-2 flex items-center justify-center rounded-[5px]" disabled={loading} type="button" onClick={handleSignup} >
  {loading ? <ClipLoader color="#ffffff" size={20} /> : "Sign Up"}
</button>

<div className="w-[80%] flex items-center gap-2">
  <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
  <div className='w-[50%] text-[15px] text-[#999797] flex items-center justify-center ' >Or continue</div>
  <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
</div>

<div className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center gap-2 cursor-pointer" onClick={googleSignUp}>
  <img src={google} className="w-[25px]" alt="Google logo" />
  <span className="text-[18px]  text-gray-500">Google</span>
</div>
<div className="text-[#6f6f6f]">
  already have an account
  <span
    className="underline underline-offset-1 text-black cursor-pointer"
    onClick={() => navigate("/login")}
  >
    Login
  </span>
</div>

   
         </div>
         {/* right div */}
         <div className='hidden lg:flex w-[50%] h-[100%] rounded-r-2xl bg-[black]   md:flex items-center justify-center flex-col hidden' >
            <img src={logo} alt="logo" className='w-30 shadow-2xl' />
            <span className='text-2xl text-white' >VIRTUAL COURSES</span>
         </div>
      </form>
    </div>
  )
}

 

export default SignUp
