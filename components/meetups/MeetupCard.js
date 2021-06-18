import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

const CardStyles = styled(motion.div)`
  background: var(--purple);
  border-radius: 1rem;
  box-shadow: var(--bs);
  padding: 1rem;
  max-width: 500px;
  margin: auto;
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const CardContent = styled.div`
  text-align: center;
  img {
    border-radius: 1rem;
    width: 500px;
    max-width: 100%;
    max-height: 200px;
    @media (max-width: 768px) {
      width: 100%;
      height: 200px;
    }
  }
  h4 {
    font-size: 1.75rem;
    color: var(--blue);
    padding: 1.5rem 0;
}
`;


export default function MeetupCard({ url, meetup }) {
  const formattedDate = format(parseISO(`${meetup.date}`), 'EEEE MMMM do, yyyy');

  return (
    <CardStyles
      whileHover={{ 
        scale:1.05, 
        backgroundColor: 'var(--yellow)',
        cursor: 'pointer'
      }} 
    whileTap={{ scale: 0.9975 }}
    transition={{ duration: 0.2 }}
  >
    <Link href={`/${url}/${meetup.id}`}>
      <CardContent>
        <img 
          src={meetup.image}
          alt={meetup.title}
        />
        <h4>{meetup.title}</h4>
        <h2>{formattedDate}</h2>
      </CardContent>
    </Link>
  </CardStyles>    
  )
}
