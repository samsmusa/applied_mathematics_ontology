import React from "react";
import dynamic from "next/dynamic";
import { NextPageWithLayout } from "@/interfaces/layout";
import { MainLayout } from "@/components/layout";
// import { HomeFeature, HomeHero, HomePopularCourse, HomeTestimonial, HomeOurMentors, DynamicHomeNewsLetter } from '@/components/home'

const DynamicGraph = dynamic(() => import("../../components/ontology/graph"), {
  ssr: false,
});

const Ontology: NextPageWithLayout = () => {
  return (
    <>
      <DynamicGraph />
    </>
  );
};

Ontology.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Ontology;
