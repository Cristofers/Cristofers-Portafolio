'use client'
import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Base from '../layouts/Base'
import Diploma from '../components/Diploma'
import stripHtml from '../lib/strip-html'
import items from '../data/diplomas'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Cristofers Valdez Quintin',
    tagline: 'Diplomas',
    image: '/static/images/projects-bw.jpg',
    primaryColor: 'green',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function Projects(props) {
  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <Diploma
          key={index}
          description={item.description}
          duration={item.duration}
          index={0}
          image={item.image}
          title={''}
        />
      )
    })
  }

  const { title, image } = props
  const description = `I don't consider a piece of paper to indicate a person's knowledge, but to me they are like trophies that indicate my commitment to learning.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/projects" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h2>My Diplomas</h2>
        <DiplomasContainer>{renderAll()}</DiplomasContainer>
      </AnimateSharedLayout>
    </>
  )
}

const DiplomasContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1,1fr)',
  '@bp2': {
    gridTemplateColumns: 'repeat(2,1fr)',
  },
})

Projects.Layout = Base

export default Projects
