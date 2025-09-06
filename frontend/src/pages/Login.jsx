import React ,{  useState} from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { HiOutlineEye } from 'react-icons/hi';
import { HiEye } from 'react-icons/hi';
 import { useDispatch } from 'react-redux';
import { serverUrl } from '../App';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firbase';


function Login(props) {
  const [show , setShow] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [loading, setLoading] = useState(false);
     const handlelogin= async (e) => { 
       e.preventDefault();
      setLoading(true) ;
      try {
        const result = await axios.post(serverUrl + "/api/auth/login", {
          email,
          password
        } , {withCredentials: true} );
        console.log(result);
        dispatch(setUserData(result.data.user));



        setLoading(false);
        navigate("/")
        toast.success("Login successful!");

        
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }

     }
     const googleLogin = async () => { 
  try {
     

    const response = await signInWithPopup(auth, provider);
    let user = response.user ;
    let name = user.displayName
   let email = user.email;
      let role =  "" 

   const result = await axios.post(serverUrl + "/api/auth/googleauth", { name, email , role },{withCredentials:true} );
    dispatch(setUserData(result.data.user));

    navigate("/") 
    toast.success("Google login successful!");
    console.log(response);
  }  catch (error) {
      toast.error("Google login failed. Please try again.");

  }
}
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex ' >
         {/* left div */}
         <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 '>
       <div>
       <h1 className='font-semibold text-[black] text-2xl'>let's get started</h1>
        <h2 className='text-[#999797] text-[18px]'>login in your account </h2>
       </div>
       
     
   <div className='flex flex-col gap-1 w-[80%] items-start  justify-center px-3'>
      <label htmlFor="email" className='font-semibold'>Email</label>
      <input id='email' type="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your email' onChange={(e) => setEmail(e.target.value)} value={email} />
   </div>
       <div className='flex flex-col gap-1 w-[80%] items-start  justify-center px-3 relative '>

      <label htmlFor="password" className='font-semibold'>Password</label>
        <input id='password' type={show ? "text" : "password"} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your password' onChange={(e) => setPassword(e.target.value)} value={password} />   
        { show ? <HiOutlineEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev => !prev)}  /> :
        <HiEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev => !prev)} />
 } </div>


    <button
  type="submit"
  className="w-[80%] h-[40px]  bg-black text-white flex items-center justify-center rounded-[5px] mt-4 cursor-pointer"
  disabled={loading}
  onClick={handlelogin}
>
  {loading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
</button>

    <span className='text-[13px] cursor-pointer text-[#999797]' onClick={() => navigate('/forget-password')}  >Forgot Password ?</span>

<div className="w-[80%] flex items-center gap-2">
  <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
  <div className='w-[50%] text-[15px] text-[#999797] flex items-center justify-center ' >Or continue</div>
  <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
</div>

<div className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center gap-2 cursor-pointer" onClick={googleLogin}>
  <img src={google} className="w-[25px]" alt="Google logo" />
  <span className="text-[18px] text-gray-500">Google</span>
</div>
  <div className="text-[#6f6f6f]">
   Create new account
  <span
    className="underline underline-offset-1 text-black cursor-pointer"
    onClick={() => navigate("/signup")}
  >
    SignUp
  </span>
</div>

   
         </div>
         {/* right div */}
         <div className=' hidden lg:flex w-[50%] h-[100%] rounded-r-2xl bg-[black]   md:flex items-center justify-center flex-col hidden' >
            <img src={logo} alt="logo" className='w-30 shadow-2xl' />
            <span className='text-2xl text-white' >VIRTUAL COURSES</span>
         </div>
      </form>
    </div>
  )
}

 

export default Login
