import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ai from  '../assets/SearchAi.png'
import { useSelector } from 'react-redux'
import Card from '../component/Card.jsx'
function AllCourses() {
    const navigate = useNavigate() ;
    const {courseData} = useSelector(state => state.course)
  const [category,setCategory] = useState([]) ;
  const [filterCourses, setFilterCourses] = useState([]) 

   const toggleCategory = (e) => {
    if(category.includes(e.target.value) ) {
        setCategory(prev => prev.filter( c=> c !== e.target.value))
    }else {
        setCategory(prev => [...prev , e.target.value]) 
    }
   }

   const applyFilter = () =>  {
    let courseCopy = courseData?.slice() 
    if(category.length > 0) {
        courseCopy = courseCopy.filter(c => category.includes(c.category))

    }
    setFilterCourses(courseCopy) 
   }

   useEffect(()=> {
    setFilterCourses(courseData)
   },[courseData])

   useEffect( ()=> {
    applyFilter()
   } , [category])

   
    return (
    <div className='flex min-h-screen bg-gray-50' >
        <Nav/>
        {/* side bar  */}
    <aside className="w-[260px] h-screen overflow-y-auto bg-black fixed top-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-50">
  <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6">
    <FaArrowLeftLong className="text-white cursor-pointer" onClick={() => navigate("/")} />
    Filter by Category
  </h2>

  <form className="space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl" onSubmit={(e) => e.preventDefault()}>
    <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer">
      Search With AI <img src={ai} alt="search ai" className="w-[30px] h-[30px] rounded-full" />
    </button>

    {/* Corrected categories */}
    <label htmlFor="app-dev" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="app-dev" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="App Development" /> App Development
    </label>
    <label htmlFor="ai-ml" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="ai-ml" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="AI/ML" /> AI/ML
    </label>
    <label htmlFor="ai-tools" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="ai-tools" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="AI Tools" /> AI Tools
    </label>
    <label htmlFor="data-science" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="data-science" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="Data Science" /> Data Science
    </label>
    <label htmlFor="data-analytics" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="data-analytics" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="Data Analytics" /> Data Analytics
    </label>
    <label htmlFor="ethical-hacking" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="ethical-hacking" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="Ethical Hacking" /> Ethical Hacking
    </label>
    <label htmlFor="ui-ux" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="ui-ux" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="UI UX Designing" /> UI UX Designing
    </label>
    <label htmlFor="web-dev" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="web-dev" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="Web Development" /> Web Development
    </label>
    <label htmlFor="others" className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
      <input id="others" type="checkbox" className="accent-black w-4 h-4 rounded-md" onChange={toggleCategory} value="Others" /> Others
    </label>
  </form>
</aside>
      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]">
  {filterCourses.map((course, index) => (
    <Card
      key={index}
      thumbnail={course.thumbnail}
      title={course.title}
      category={course.category}
      price={course.price}
      id={course._id}
    />
))}
</main>
        </div>
  )
}

export default AllCourses