import React ,{useContext, useState} from 'react';
import "./Expense.css";
import { NavLink } from 'react-router-dom';
// import axios from "axios";
import AuthContext from '../../store/auth-context';
import { Header } from '../Layout/Header';
import { Expensetracker } from './Expensetracker';


export const Expense = () => {

    const [verifyemail, setverifyemail]=useState('');
    const authctx=useContext(AuthContext)

    const emailhandler=(event)=> {
        setverifyemail(event.target.value)
    }

    const submitemailhandler=(event)=> {
        event.preventDefault();

        const emailtoverify=verifyemail;
        console.log(emailtoverify)

       fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAf6J52jNqJEy0CshFzk3c09s6FLjn3wA', {
        method:'POST',
        body:JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken:authctx.token


        })

       }).then((res)=> {
        if(res.ok){
            return res.json()
        }
        else {

            res.json().then((data)=> {
                let err;
                if(data && data.error && data.error.message){
                    err=data.error.message
                }
                throw new Error(err)
            })

        }
        
       })
       .then((data)=> {
        console.log(data)
       })
       .catch((err)=> {
        console.log(err)
       
       })
    

    }
  return (
    <>   
         <Header />
        <div className='expensehead'>
        <div>
            <p>welcome express tracker</p>
        </div>
        <div>
            <p>Your profile is incomplete <NavLink to="/profile">complete now</NavLink></p>
        </div>

        </div>
        <div className='verifyemail'>
            <div>
                <form onSubmit={submitemailhandler}>
                <label>Verify email</label>
                <input type="email" onChange={emailhandler}></input>
                <button type="submit">verify</button>
                </form>
            </div>
        </div>
 
        <div>
        <Expensetracker />
        </div>  
    </>
  )
}
