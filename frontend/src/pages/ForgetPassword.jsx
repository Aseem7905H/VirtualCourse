import axios from 'axios';
 
import React, { use } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';
function ForgetPassword() {
   const [step , setStep] = useState(1);
   const navigate = useNavigate();
   const [email , setEmail] = useState("");
   const [otp , setOtp] = useState("");
   const [newPassword , setNewPassword] = useState("");
   const [conPassword , setConPassword] = useState("");
   const [loading , setLoading] = useState(false);
   //  step 1
    const sendOtp = async ()=> {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+"/api/auth/sendotp",
                {email} ,{withCredentials:true}  )
                console.log(result.data) 
                setLoading(false);
                setStep(2) 
                toast.success(result.data.message)
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message)
        }    } 
        // step 2
        const verifyOTP  = async ()=> {
            setLoading(true)
            try {
                if(newPassword !== conPassword) {
                  return toast.error("Passwords is not match");
                    
                    
                }
                const result = await axios.post(serverUrl+"/api/auth/verifyotp",
                    {email, otp} ,{withCredentials:true}  )
                    console.log(result.data) 
                    setLoading(false);
                    setStep(3) 
                    toast.success(result.data.message)
            } catch (error) {
                setLoading(false);
                toast.error(error.response.data.message)
            }    }

            // step 3 
            const resetPassword = async () => { 
                setLoading(true) 
                try {
                    const result = await axios.post(serverUrl+"/api/auth/resetpassword", {email,password:newPassword} ,{withCredentials:true}  )
                    console.log(result.data) 
                    setLoading(false);
                    navigate('/login') 
                    toast.success(result.data.message)
                } catch (error) {
                    setLoading(false);
                    console.log(error.response)
                    toast.error(error.response)
                }
            }

    return (
        

    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4' > 
     {/* step 1 */} 
    {step == 1 && (
  <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Forget Your Password
    </h2>

    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your email address
        </label>
        <input
          id="email"
          type="text" onChange={(e) => setEmail(e.target.value)} value={email} 
          className="mt-1  w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder='youremail@gmail.com'  required
        />
      </div>
      <button
  className="w-full bg-[#4b4b4b] hover:bg-black text-white py-2 px-4 rounded-md font-medium cursor-pointer" onClick={sendOtp} disabled={loading}
>
  {loading ? <ClipLoader size={30} /> : "Send OTP"}
</button>
    </form>  
    <div className='text-sm text-center mt-4 cursor-pointer' onClick={() => navigate('/login')} > Back to login  </div>
  </div>
)} 
      {/*step 2 */}
      {step ==2 && 
  <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
     Enter OTP
    </h2>

    <form className="space-y-4" onSubmit={(e)=> e.preventDefault()} >
      <div>
        <label
          htmlFor="otp"
          className="block text-sm font-medium text-gray-700"
        >
          Enter 4-digit otp which you received on your email
        </label>
        <input
          id="otp"
          type="text" onChange={(e) => setOtp(e.target.value)} value={otp} 
          className="mt-1  w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"  placeholder='****'  required
        />
      </div>
      <button
  className="w-full bg-[#4b4b4b] hover:bg-black text-white py-2 px-4 rounded-md font-medium cursor-pointer" disabled={loading} onClick={verifyOTP}
>
  {loading ? <ClipLoader size={30} color='white' /> : "Verify OTP"}
</button>
    </form>  
    <div className='text-sm text-center mt-4 cursor-pointer' onClick={() => navigate('/login')} > Back to login  </div>
  </div>
}   
{  step == 3 && (
  <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Reset Your Password
    </h2>
    <p className='text-sm text-center text-gray-600 mb-6'>Please enter your new password below.</p>

    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); resetPassword(); }}>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          id="password"
          type="text" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}
          className="mt-1  w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder='********'  required
        />
      </div>  
         <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="text" onChange={(e) => setConPassword(e.target.value)} value={conPassword} 
          className="mt-1  w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder=' ********'  required
        />
      </div>
      <button
  className="w-full bg-[#4b4b4b] hover:bg-black text-white py-2 px-4 rounded-md font-medium cursor-pointer" disabled={loading} onClick={resetPassword}
>
  {loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}
</button>
    </form>  
    <div className='text-sm text-center mt-4 cursor-pointer' onClick={() => navigate('/login')} > Back to login  </div>
  </div>
)}

     </div>
  )
}

export default ForgetPassword