import React from 'react'
import styled from 'styled-components'
import TodoApp from './TodoApp'
import Signin from './Signin'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom"

function MainApp() {



    return (
        <Container>
            <Router>
                <NavBar>
                    <div style={{fontSize:"32px", fontWeight:"700", marginLeft:"20px",}}>
                        <Link  to="/" style={{textDecoration:"none", color:"#000"}}>Todo App</Link>
                    </div>  
                    <div style={{display:"flex"}}>
                        <SignUp><Link to='/signin'  style={{textDecoration:"none", color:"#fff"}}>Sign In</Link></SignUp> 
                    </div>
                </NavBar>    
                <Main>
                    <Routes>
                        <Route exact path="/" element={<TodoApp />}/>
                        <Route exact path="/signin" element={<Signin />}/>
                    </Routes>
                </Main>
            </Router>
        </Container>
  )
}

export default MainApp


const Container = styled.div`
    min-height: 100vh;
    background-color: #0c0f0a;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
`
const NavBar = styled.div`
    width:100%;
    height:70px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color: #ff206e;
`


const Main = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    min-height: 500px;
    width: 650px;
    background-color: #ff206e;
    border-radius:3%;
    margin-bottom:70px;
    margin-top: 100px;
    input{
        margin: 20px 0px;
    }
`


const LogIn = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 10px 13px 12px;
    background-color: #0c0f0a;
    font-weight:600;
    font-size:18px;
    margin-right:20px;
    border-radius:4px;
    cursor: pointer;
`
const SignUp = styled(LogIn)``;



