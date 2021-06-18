import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'
import styled from 'styled-components';

const CardStyles = styled(motion.div)`
  background: var(--purple);
  border-radius: 1rem;
  box-shadow: var(--bs);
  padding: 1rem;
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const CardContent = styled.div`
  img {
    border-radius: 1;
    @media (max-width: 768px) {
      width: 200;
      height: 100;
    }
  }
  h4 {
    padding: 1.5rem 0;
    font-size: 1.75rem;
    text-align: center;
    color: var(--blue);
  }
`;

export default function TypeCard({ type }) {
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
      <Link href={type.url}>
        <CardContent>
          <Image 
            src={type.image}
            alt={type.name}
            sizes="(max-width: 500px) 300px, 80vw"
            width={500}
            height={300}
            className="image"
          />
          <h4>{type.name}</h4>
        </CardContent>
      </Link>
    </CardStyles>
  );
}
