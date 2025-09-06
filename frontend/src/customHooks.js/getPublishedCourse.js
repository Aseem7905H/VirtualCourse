import axios from 'axios';
import React, { useEffect } from 'react'
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setCourseData } from '../redux/courseSlice';


function getPublishedCourse() {
    const dispatch = useDispatch();
   useEffect(()=>{
     const getCourseData = async () => {
       try {
         const result = await axios.get(`${serverUrl}/api/course/getpublished`, { withCredentials: true });
         console.log("Published Courses:", result.data);
         dispatch(setCourseData(result.data));
       } catch (error) {
         console.error("Error fetching published courses:", error);
       }
     };
     getCourseData();
   }, []);
}

 

export default getPublishedCourse