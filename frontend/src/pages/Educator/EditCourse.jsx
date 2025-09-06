import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6"; 
import { FaEdit } from "react-icons/fa";
import img from '../../assets/empty.jpg'
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';
 
function EditCourse() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseData} = useSelector(state => state.course);
    const {courseId} = useParams();
    const thumb = useRef() ;
    const [isPublished, setIsPublished] = useState(false);
    const [selectCourse , setSelectCourse] = useState(null);
    const [title , setTitle] = useState("");
    const [subTitle , setSubTitle] = useState("");
    const [category , setCategory] = useState("");
    const [description , setDescription] = useState("");
    const [level , setLevel] = useState("");
    const [price , setPrice] = useState("");
    const [frontendImage, setFrontendImage] = useState(img);
    const [backendImage, setBackendImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingR, setLoadingR] = useState(false);

    const handleThumbnail = (e) => {
        const file = e.target.files[0] ;
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }


 const getCourseById = async () => {
   try {
      const result = await axios.get(serverUrl+ `/api/course/getcourse/${courseId}` , {withCredentials: true} );
      setSelectCourse(result.data);
      console.log("Selected Course:", result.data);
   } catch (error) {
     console.error("Error fetching course:", error);
   }
 }
     useEffect (() => {
       if (selectCourse) {
         setTitle(selectCourse.title ||"");
         setSubTitle(selectCourse.subTitle ||"");
         setDescription(selectCourse.description ||"");
         setCategory(selectCourse.category ||"");
         setLevel(selectCourse.level ||"");
         setPrice(selectCourse.price ||"");
         setFrontendImage(selectCourse.thumbnail || img);
         setIsPublished(selectCourse?.isPublished || false);
       }
     }, [selectCourse]);


 useEffect(() => {
      getCourseById();
    }, []);

    const handleEditCourse = async () => {
      
       setLoading(true);
       const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitle", subTitle);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("level", level);
        formData.append("price", price);
        formData.append("thumbnail", backendImage);
        formData.append("isPublished", isPublished);
      try {
         const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData, { withCredentials: true });
        console.log("Course updated successfully:", result.data);

        const updateData  = result.data ;
        if(updateData.isPublished){
            const updatedCourses = courseData.map(c => c._id === courseId ? updateData : c   )
            if(!courseData.some(c => c._id === courseId))
            {
                updatedCourses.push(updateData) ;
            }
            dispatch(setCourseData(updatedCourses));
        }else {
            const filteredCourses = courseData.filter(c => c._id !== courseId);
            dispatch(setCourseData(filteredCourses));
        }

        setLoading(false);
        toast.success("Course updated successfully");
        navigate("/courses");
      } catch (error) {
        setLoading(false);
        toast.error("Error updating course");
        console.error("Error updating course:", error.response.data.message);
      }
    }; 

    const handleRemoveCourse = async () => {
        setLoadingR(true);
        try {
            const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, { withCredentials: true });
            const filterCourse = courseData?.filter(course => course._id !== courseId);
            dispatch(setCourseData(filterCourse));
            console.log("Course removed successfully:", result.data);
            setLoadingR(false);
            toast.success("Course removed successfully");
            navigate("/courses");
        } catch (error) {
          setLoadingR(false);
  const message = error.response?.data?.message || error.message || "Unknown error";
  toast.error("Error removing course: " + message);
  console.error("Error removing course:", message);
        }
    }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
        {/* top bar      */}
        <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row  mb-6 relative" >
        <FaArrowLeftLong
  className="absolute top-[-20%] md:top-[20%] left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer"
  onClick={() => navigate("/courses")}
/>  <h2 className="text-2xl font-semibold md:p-[60px]">
  Add Detail Information regarding the Course
</h2>

<div className="space-x-2 space-y-2">
  <button className="bg-black text-white px-4 py-2 rounded-md">
    Go to Lecture page
  </button>
</div>
    </div>   
 
    {/* /form data  */}
   <div className="bg-gray-50 p-6 rounded-md">
  <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>

  <div className="space-x-2 space-y-2">
   {!isPublished ?  <button className="bg-green-100 text-green-600 px-4 py-2 rounded-md border" onClick={() => setIsPublished(prev => !prev)}>
      Click to publish
    </button> :  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md border" onClick={() => setIsPublished(prev => !prev)}>
      Click to UnPublish
    </button>  }

    <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleRemoveCourse} disabled={loadingR}>
      {loadingR ?  <ClipLoader size={30} color={"#fff"}   /> : "Remove Course"}
    </button>
</div>

    <form className='space-y-4' action="" onSubmit={(e) => { e.preventDefault(); }}>
    <div>
  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1"   > Title</label>
 <input   id="title" type="text" className="w-full border px-4 py-2 rounded-md" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Course Title" />
</div>
 <div>
  <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1" > Subtitle</label>
 <input   id="subtitle" type="text" className="w-full border px-4 py-2 rounded-md" onChange={(e) => setSubTitle(e.target.value)} value={subTitle} placeholder="Course Subtitle" />
</div>
 <div>
  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1" > Description</label>
  <textarea name="description" id="description" className="w-full border px-4 py-2 h-24 rounded-md resize-none" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Course Description"></textarea>
</div>
     
     <div className=' flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
        {/*  for category   */}
        <div  className='flex-1'>
                        <label htmlFor='' className="block text-sm font-medium text-gray-700 mb-1">
                           Course Category
                        </label>
                        <select 
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[black]"
                            onChange={(e)=>setCategory(e.target.value)} value={category}
                        >
                            <option value="">Select category</option>
                            <option value="App Development">App Development</option>
                             <option value="AI/ML">AI/ML</option>
                            <option value="AI Tools">AI Tools
                            </option>
                             <option value="Data Science">Data Science</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Ethical Hacking">Ethical Hacking</option>
                            <option value="UI UX Designing">UI UX Designing</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
            {/* for level */}
            <div className='flex-1' >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course Level
                        </label>
                        <select name='' id=''
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[black]"
                            onChange={(e)=>setLevel(e.target.value)} value={level}
                        >
                            <option value="">Select level</option>
                            <option value="Beginner">Beginner</option>
                             <option value="Intermediate">Intermediate</option>
                             <option value="Advanced">Advanced</option>

                        </select>
                    </div>
                     
                     
                    {/* for price */}
                    <div className='flex-1' >
                        <label htmlFor='price'  className="block text-sm font-medium text-gray-700 mb-1">
                            Course Price (INR)
                        </label>
                        <input type="number" name="price" id="price" className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[black]" placeholder="₹" onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>

                   


      </div>
       <div>
                        <label htmlFor='' className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
                        <input  type='file' hidden ref={thumb} accept='image/*' onChange={handleThumbnail}></input> </div>
                        <div className='relative w-[300px] h-[170px]  ' >
                            <img src={frontendImage} alt='Course Thumbnail' className='w-[100%] h-[100%] border-1 border-black rounded-[5px]'
                            onClick={() => thumb.current.click()} />
                            <FaEdit className='absolute bottom-[10px] right-[10px] w-[25px] h-[25px] text-white bg-black rounded-full p-[5px] cursor-pointer' onClick={() => thumb.current.click()} />
                        </div>

                        <div className="flex items-center justify-start gap-[15px]">
  <button
    className="bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-4 py-2 rounded-md"
    onClick={() => navigate("/courses")}
  >
    Cancel
  </button>

  <button className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer" onClick={handleEditCourse} disabled={loading}>
    {loading ? <ClipLoader color="#ffffff" size={30} /> : "Save"}
  </button>
</div>

    </form>

</div>

    </div>
  )
}

export default EditCourse