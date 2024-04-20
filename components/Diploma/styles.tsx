import { styled } from '../../stitches.config'
import { motion } from 'framer-motion'

export const Article = styled('div', {
  border: '0',
  width: '380px',
  textDecoration: 'none',
  '&:hover': { opacity: 1 },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const ImageContainer = styled('div', {
  borderRadius: '8px',
  width: '370px',
  height: '180px',
  marginBottom: '20px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  filter: 'grayscale(1)',
})

export const Content = styled('div', {
  maxWidth: '450px',
  marginRight: '20px',
  '@bp2': { maxWidth: '100%', marginRight: 0 },
})

export const Title = styled('h3', {
  color: '$primary',
  margin: 0,
})

export const Description = styled('p', {
  color: '$secondary',
  display: '-webkit-box',
  margin: 0,
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export const Stats = styled('p', {
  margin: '5px 0 0',
  color: '$primary',
  textTransform: 'uppercase',
  display: 'inline-block',
  fontWeight: 500,
  letterSpacing: '1.2px',
  fontSize: '12px',
})

export const AnimContainer = styled(motion.div, {
  position: 'relative',
  width: '100%',
  padding: '20px',
})

export const AnimHovered = styled(motion.div, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: -1,
})
