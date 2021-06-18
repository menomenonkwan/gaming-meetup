import TypeCard from './TypeCard';
import styled from 'styled-components';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  max-width: var(--maxWidth);
  margin: auto;
  padding: 2rem;
`;

export default function TypeList({ meetup_type }) {
  return (
    <GridStyles>
      {meetup_type.map(type => (
        <TypeCard
          key={type.id}
          type={type}
        />
      ))}
    </GridStyles>
  )
}
