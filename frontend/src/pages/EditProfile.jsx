import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

function EditProfile() {
    const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name , setName] = useState(userData.name || "")
  const [email , setEmail] = useState(userData.email || "")
  const [description , setDescription] = useState(userData.description || "")
   
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl || null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  

      const handleEditProfile = async () => {
  setLoading(true);
    const formData = new FormData();
       
  formData.append("name", name);
  formData.append("description", description);
  formData.append("photoUrl", photoUrl);
     
  try {
      
    const result = await axios.post(`${serverUrl}/api/user/profile`, formData, { withCredentials:true });
    console.log(result.data)
    dispatch(setUserData(result.data));
    setLoading(false);
    toast.success("Profile updated successfully");
    navigate("/profile");
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response?.data?.message || "Profile update failed");

  }  
}

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>
        <FaArrowLeft className='absolute top-4 left-4 w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/profile")} />
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>Edit Profile</h2>
         <form action="" className=' space-y-5' onSubmit={(e) => {
           e.preventDefault();
           
         }} >
            <div className='flex flex-col items-center text-center' >
    {userData?.photoUrl ? (
        <img
          src={userData?.photoUrl}
          className='w-24 h-24 rounded-full object-cover border-4 border-black'
          alt=''
        />
      ) : (
        <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
          {userData?.name?.slice(0,1).toUpperCase()}
        </div>
      )}
            </div>
            <div>
                <label htmlFor='image' className=' text-sm font-medium text-gray-700'> Select Avatar </label>
                <input type="file" id='image' accept='image/*' className='w-full px-4 py-2 border rounded-md text-sm ' placeholder='Photo Url' name='photoUrl' onChange={(e) => setPhotoUrl(e.target.files[0])} />
            </div>
            <div>
                <label htmlFor='name' className=' text-sm font-medium text-gray-700'> UserName </label>
                <input type="text" id='name' className='w-full px-4 py-2 border rounded-md text-sm ' placeholder={userData?.name} name='name' onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div>
                <label htmlFor='email' className=' text-sm font-medium text-gray-700'> Email </label>
                <input type="text" id='email' className='w-full px-4 py-2 border rounded-md text-sm ' placeholder={userData?.email  } readOnly name='email'    />
            </div>
            <div>
                <label htmlFor='bio' className=' text-sm font-medium text-gray-700'> Bio </label>
                <textarea id='bio' className='w-full px-4 py-2 border rounded-md text-sm resize-none focus:ring-2 focus:ring-[black] ' rows={3} placeholder="Tell us about yourself"  name='description' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>

            </div>
            <button className='w-full bg-black text-white py-2 rounded-md active:bg-[#454545] font-medium transition cursor-pointer' disabled={loading} onClick={handleEditProfile} > { loading ? <ClipLoader size={30} color='white' /> : "Save Changes" }</button>
         </form>
      </div>
    </div>
  )
}

export default EditProfile