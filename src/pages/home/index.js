import React from 'react'
import Hero from "../../components/Home/Hero"
import Courses from "../../components/Home/Courses"
import Reviews from "../../components/Home/Reviews"
import FAQ from "../../components/Home/FAQ"
const index = () => {
  return (
    <>
     <div className="container">

    
      <Hero/>
      <Courses/>
      <Reviews/>
      <FAQ/>
      </div>
    </>
  )
}

export default index
