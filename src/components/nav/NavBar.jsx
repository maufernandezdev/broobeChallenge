import React , { useRef , useContext, useState, useEffect} from "react"
import './NavBar.css';
import { Link } from 'react-router-dom'
import { Session } from "../../context/sessionContext"
import { useNavigate } from 'react-router-dom'

const NavBar = () =>{

    const navRef = useRef();
    const {userSession, setToken} = useContext(Session);
    const [ buttonSessionValue, setButtonSessionValue] = useState('')
    useEffect(() => {
      if(userSession) setButtonSessionValue('Logout')
      else setButtonSessionValue('Login')
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if(userSession) setButtonSessionValue('Logout')
            else setButtonSessionValue('Login')
        }, 1000);
    }, [userSession])
    
    const navigate = useNavigate();
    const handleSession = () =>
    {   
        if(userSession)
        {
            setButtonSessionValue('...')
        }
        setTimeout(() => {
            setToken('')
            setButtonSessionValue('Login')
            navigate('/login')
        }, 1000);
    }
    return(
        <header>
            <nav ref={navRef}>
                {
                    !userSession ? (
                        <Link to='/'>Home</Link>
                    ) : (
                        <Link to='/issues'>Issues</Link>
                    )
                }
                <button className="button__login" onClick={handleSession}>{buttonSessionValue}</button>
            </nav>
        </header>
    )
}

export default NavBar;