import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

function Logos() {
  return (
    <div className="w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]">
  <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#033946]">
    <MdCastForEducation className="w-[35px] h-[35px] fill-[#033946]" />
    20k+ Online Courses
  </div>
  <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#033946]">
     
    <SiOpenaccess className="w-[35px] h-[35px] fill-[#033946]" />
    Lifetime Access
  </div>
  <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#033946]">
     
    <FaSackDollar className="w-[35px] h-[35px] fill-[#033946]" />
    Value for Money
  </div>
  <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#033946]">
    <BiSupport className="w-[35px] h-[35px] fill-[#033946]" />
    Lifetime Support
  </div>
  <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#033946]">
    <FaUsers className="w-[35px] h-[35px] fill-[#033946]" />
    Community Support
  </div>
</div>
  )
}

export default Logos