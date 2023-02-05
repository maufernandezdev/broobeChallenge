import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container'>
      <h1>Broobe challenge</h1>
      <div className='container__description'>
        <p>You can log in with "Get started" or also if you want you can see the documentation on Github.</p>
      </div>
      <div className='buttonsContainer'>
        <Link to='/login'>Get started</Link>
        <Link to='https://github.com/maufernandezdev/broobeChallenge' target='_blank'>Docs</Link>
      </div>
    </div>
  )
}

export default Home