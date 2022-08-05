import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import "./Header.css"

export const Header = () => {


    const history=useHistory();
    const authctx=useContext(AuthContext)

    const isLoggedIn=authctx.isLoggedIn;

    const logoutHandler=()=> {
        authctx.logout();
        history.replace("/login")
    }
  return (
    <>
      <div className='navheader'>
        {isLoggedIn && (<button onClick={logoutHandler}>logout</button>)}
      </div>
    </>
  )
}
