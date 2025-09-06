 
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function CardPage() {
    const {courseData} = useSelector(state => state.course)
    const [popularCourses, setPopularCourses] = useState([])

    useEffect(()=> {
    setPopularCourses(courseData?.slice(0,6)) ;
    },[courseData])

  return (
    <div className='relative flex items-center justify-center flex-col'>
      <h2 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]' > our popular Courses </h2>
      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>Explore our curated list of courses designed to enhance your skills and advance your career.</span>
      <p className='text-gray-600'>Course Description</p>

    <div className='w-[100%]   flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px] '>
      {popularCourses?.map((course,index ) => (
        <Card key = {index} thumbnail={course?.thumbnail} title={course?.title} category={course?.category} price={course?.price} id={course?._id} />
         
      ))} 
    </div>

    </div>
  )
}

export default CardPage