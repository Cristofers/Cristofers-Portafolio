import { diplomaProps } from '../../data/diplomas'
import {
  Article,
  Container,
  ImageContainer,
  Content,
  Description,
  Stats,
  Title,
} from './styles'
import React from 'react'
import { Animation } from './animation'

export default function Diploma({
  description,
  duration,
  image,
  index,
  title,
}: diplomaProps) {
  console.log(`url(${image})`)
  return (
    <Article>
      <Animation index={index}>
        <Container>
          <ImageContainer
            css={{ backgroundImage: `url(/static/images/diplomas/${image})` }}
          />
          <Content>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Stats>{duration}</Stats>
          </Content>
        </Container>
      </Animation>
    </Article>
  )
}
