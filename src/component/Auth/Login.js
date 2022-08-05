import React, { useContext, useState } from 'react'
import "./Login.css"
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
export const Login = () => {
    const history=useHistory();
    const[loginuser, setloginuser]=useState('');
    const[loginpassword,setloginpassword]=useState('');
    const [isloading, setisloading]=useState(false)
    const [error,seterror]=useState(false)

    const authctx=useContext(AuthContext)

    const loginemailhandler=(event)=> {
        setloginuser(event.target.value)
    }

    const loginpasswordhandler=(event)=> {
        setloginpassword(event.target.value)
    }

    const loginsubmithandler=(event)=> {
        event.preventDefault();
        console.log(loginuser,loginpassword)


         setisloading(true)
         seterror(null)
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAf6J52jNqJEy0CshFzk3c09s6FLjn3wA',{
            method:'POST',
            body:JSON.stringify({
              email:loginuser,
              password:loginpassword,
              returnSecureToken:true
            }),
            headers: {
              'Content-Type':'application/json'
             }
        }).then(res=>{
         setisloading(false)            
            if(res.ok){
                return res.json()
            }
            else {
                res.json().then((data)=>{
                    let errormsg;
                    if(data && data.error && data.error.message){
                    errormsg=data.error.message
                    }
                    alert(errormsg)
                    seterror(errormsg)
                    throw new Error(errormsg)
                })
            }
        })
        .then((data)=> {
            console.log(data);
            authctx.login(data.idToken)
            history.replace('/expense')
        })
        .catch((err)=>{
            // alert(err.message)
            // seterror(err.message)
            console.log(err.message)
            
        });
    }
    
  return (
    <>
        <div className='loginform'>
            <form onSubmit={loginsubmithandler}>
                <h1 style={{textAlign:"center"}}>Login</h1>
                <div>
                    <input type="email" placeholder="email" onChange={loginemailhandler}></input>
                </div>
                <div>
                    <input type="password" placeholder="password" onChange={loginpasswordhandler}></input>
                </div>
                <div className='logindiv'>
                    {!isloading && <button className='login'>Login</button> }
                </div>
                <div style={{textAlign:"center"}}>
                    <p><NavLink to="/forgotpassword">forgot password</NavLink></p>
                </div>
                <div>
                    {isloading && <p>sending request</p> }
                </div>
                <div>
                    {!isloading && error && <p>{error}</p>}
                </div>

            </form>
        </div>
    </>
  )
}
