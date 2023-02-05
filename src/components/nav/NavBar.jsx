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
        if(userSession) setButtonSessionValue('Logout')
        else setButtonSessionValue('Login')
    }, [userSession])
    
    const navigate = useNavigate();
    const handleSession = () =>
    {
        setToken('')
        navigate('/login')

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