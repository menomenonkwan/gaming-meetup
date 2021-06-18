import Link from 'next/link'
import styled from 'styled-components';
import { useState } from 'react';
import { makeStyles, Menu, MenuItem, Button } from '@material-ui/core';

const HeaderStyles = styled.header`
  background: var(--blue);
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  a {
    margin-left: 3rem;
    text-decoration: none;
    font-size: 1.5rem;
    color: var(--purple);
    transition: color 0.3s ease;
  }
  a:hover,
  a:active,
  a.active {
    color: var(--orange);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 2rem;
    flex-direction: column;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  color: var(--white, white);
  font-weight: bold;
  position: relative;
  p {
    color: var(--yellow);
  }
  &:hover {
    cursor: pointer;
    border-bottom: 1px solid var(--purple);
  }
`;


const Nav = styled.nav`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const useStyles = makeStyles({
  button: {
    color: 'var(--purple)',
    fontFamily: 'inherit',
    fontSize: '1.5rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: 'var(--orange)',
    },
  },
  menu: {
    fontFamily: 'inherit',
    fontSize: '1.5rem',
    color: 'var(--blue)',    
    "& a": {
      width: '100%',
    }
  },
});

export default function MainNavigation() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderStyles>
      <Link href='/'>
        <Logo>
          <h1>Gaming Meetups</h1>
          <p>There's Fun To Be Had...</p>
        </Logo>
      </Link>
      <Nav>

        <div>
          <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            className={classes.button}
            onClick={handleClick}
          >
            All Meetups
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} className={classes.menu}>
              <Link href='/board-gaming'>Board Gaming</Link>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menu}>
              <Link href='/console-gaming'>Console Gaming</Link>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menu}>
              <Link href='/computer-gaming'>Computer Gaming</Link>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menu}>
              <Link href='/activity'>Activities</Link>
            </MenuItem>
          </Menu>
        </div>

        <Link href='/new-meetup'>Add New Meetup</Link>
      </Nav>

    </HeaderStyles>
  );
}
