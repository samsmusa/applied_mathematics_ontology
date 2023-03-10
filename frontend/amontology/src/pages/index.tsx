import React from 'react'
import dynamic from 'next/dynamic'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
// import { HomeFeature, HomeHero, HomePopularCourse, HomeTestimonial, HomeOurMentors, DynamicHomeNewsLetter } from '@/components/home'

const DynamicHomeHero = dynamic(() => import('../components/home/hero'), { ssr: false })
const DynamicHomeFeature = dynamic(() => import('../components/home/feature'), { ssr: false })
const DynamicHomePopularCourse = dynamic(() => import('../components/home/popular-courses'), { ssr: false })
const DynamicHomeTestimonial = dynamic(() => import('../components/home/testimonial'), { ssr: false })
const DynamicHomeOurMentors = dynamic(() => import('../components/home/mentors'), { ssr: false })
const DynamicHomeNewsLetter = dynamic(() => import('../components/home/newsletter'), { ssr: false })

const Home: NextPageWithLayout = () => {
  return (
    <>
      <DynamicHomeHero />
      <DynamicHomePopularCourse />
      <DynamicHomeFeature />
      <DynamicHomeTestimonial />
      <DynamicHomeOurMentors />
      <DynamicHomeNewsLetter />
    </>
  )
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default Home
