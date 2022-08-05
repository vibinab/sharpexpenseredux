import React, { useContext, useEffect, useState } from 'react';
import "./Profile.css";
import AuthContext from '../../store/auth-context';


export const Profile = () => {
    const[profilename, setprofilename]=useState('');
    const[url,seturl]=useState('');

    const [getprofilename,setpofilename]=useState('');
    const [geturl, setgeturl]=useState('');
    const [error, seterror]=useState(null)  
     const authctx=useContext(AuthContext)

    useEffect(()=> {

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBAf6J52jNqJEy0CshFzk3c09s6FLjn3wA',{
            method:'POST',
            body:JSON.stringify({
                idToken:authctx.token
            }),
            headers: {
                'Content-Type':'application/json'
               }

        })
        .then((res)=> {

            if(res.ok){
                return res.json()
            }

            else {
                res.json().then((data)=> {
                    let err;
                    if(data && data.error && data.error.message){
                        err=data.error.message;

                    }
                    throw new Error(err)

                });
            }

        }).then((data)=>{
            console.log(data.users)
            console.log(data.users[0].photoUrl)
            console.log(data.users[0].displayName)
            setpofilename(data.users[0].displayName)
            setgeturl(data.users[0].photoUrl)
        })
        .catch(e=> {
            console.log(e.message)
        })

    },[])

  
    const profilenamehandler=(event)=> {
        setprofilename(event.target.value)
    }

    const profileurlhandler=(event)=> {
        seturl(event.target.value)
    }

    const profilehandler=(event)=> {
        event.preventDefault();
        const profilenamedata=profilename
        const urldata=url
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAf6J52jNqJEy0CshFzk3c09s6FLjn3wA', {
            method:'POST',
            body:JSON.stringify({
                idToken:authctx.token,
                displayName:profilenamedata,
                photoUrl:urldata,
                returnSecureToken:true

            }),
            headers: {
                'Content-Type':'application/json'
               }


        })
        .then((res)=> {

            if(res.ok){
                return res.json();

            }
            else {

                return res.json().then((data)=> {
                    let errormsg
                    if(data && data.error && data.error.message){
                        errormsg=data.error.message
                    }
                    seterror(errormsg)
                    throw new Error(errormsg)
                });

            }

        }).then((data)=> {
            console.log(data)
        })
        .catch(err=> {
            console.log(err.message)
        })

    }
    console.log(profilename,url)
  return (
    <>
        <div className='profilehead'>
            <h3 style={{textAlign:"center"}}>Contact details</h3>
            <form className='profileform' onSubmit={profilehandler}>

                <div>
                    <label>full name</label>
                    <input type="text" onChange={profilenamehandler} 
                    value={getprofilename}
                    required></input>
                </div>
                <div>
                    <label>profile photo url</label>
                    <input type="text" onChange={profileurlhandler} 
                    value={geturl}
                    required></input>
                </div>
                <p>  <button className='profilebtn'>update</button></p>
                 {
                    error && <p>{error}</p>
                 }
            </form>
        </div>
        
    </>
  )
}
