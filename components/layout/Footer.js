import styled from 'styled-components';

const FooterStyles = styled.footer`
  color: var(--blue);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5rem 0 2rem 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

export default function Footer() {
  return (
    <FooterStyles>
      <p>&copy; 2021 Brannon Lee</p>
    </FooterStyles>
  )
}
