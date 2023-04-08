import React from 'react';
import { Nav, Navbar, Container, Form, Button, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';
import { useState } from 'react';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
   let token = readToken()
   const [isExpanded, setExpanded] = useState(false);
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

   const [searchVal, searchAction] = useState('');
   const router = useRouter();
   let submitForm = async (e) => {
      e.preventDefault();
      setExpanded(false);
      setSearchHistory(await addToHistory(`title=true&q=${searchVal}`));
      router.push(`/artwork?title=true&q=${searchVal}`)
   };

   let logout = () => {
      setExpanded(false);
      removeToken();
      router.push('/login');
   }

   return (
      <>
         <Navbar bg="primary" expand="lg" className='fixed-top navbar-dark' expanded={isExpanded}>
            <Container>
               <Navbar.Brand>Sewak Singh Gill</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!isExpanded)} />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Link href="/" passHref legacyBehavior>
                        <Nav.Link active={router.pathname === "/"} onClick={() => setExpanded(false)}>Home</Nav.Link>
                     </Link>

                     {token &&
                        <Link href="/search" passHref legacyBehavior >
                           <Nav.Link active={router.pathname === "/search"} onClick={() => setExpanded(false)}>Advanced Search</Nav.Link>
                        </Link>
                     }
                  </Nav>


                  {token &&
                     <>
                        &nbsp;
                        <Form className="d-flex" onSubmit={submitForm}>
                           <Form.Control
                              type="search"
                              placeholder="Search"
                              className="me-2"
                              aria-label="Search"
                              value={searchVal}
                              onChange={(e) =>
                                 searchAction(e.target.value)
                              }
                              required
                           />
                           <Button className="bg-success" type='submit' >Search</Button>
                        </Form>
                        &nbsp;
                     </>
                  }

                  {token &&
                     <Nav>
                        <NavDropdown className='navbar-dark' title={token.userName} id="basic-nav-dropdown">
                           <Link href="/favourites" passHref legacyBehavior >
                              <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setExpanded(false)}>Favourites</NavDropdown.Item>
                           </Link>
                           <Link href="/history" passHref legacyBehavior >
                              <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setExpanded(false)}>Search History</NavDropdown.Item>
                           </Link>
                              <NavDropdown.Item onClick={() => {
                                 setExpanded(false);
                                 logout();
                              }}>Logout</NavDropdown.Item>
                        </NavDropdown>
                     </Nav>}
                  {!token &&
                     <Nav className="ml-auto">
                        <Link href="/register" passHref legacyBehavior><Nav.Link  active={router.pathname === "/register"} onClick={() => setExpanded(false)}>Register</Nav.Link></Link>
                        <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={() => setExpanded(false)}>Login</Nav.Link></Link>
                     </Nav>
                  }
                  &nbsp;
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <br />
         <br />
      </>
   );
}