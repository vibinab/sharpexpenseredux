import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import "./Forgotpassword.css"

export const Forgotpassword = () => {
    const [forgotemail, setforgotemail]=useState('');
    const history=useHistory();
    const [isloading, setisloading]=useState(false)


    const forgotemailhandler=(event)=> {
        setforgotemail(event.target.value)
        
    }

    const submitforgotemailhandler =(event)=> {
        event.preventDefault();
        const useremail=forgotemail
        console.log("useremail", useremail)
        setisloading(true)
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBIgjFkM6qpnh2_mVUR1jWlgfuJfjlCpyc',{
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:useremail

            }),


        }).then((res)=> {
            setisloading(false)
            if(res.ok){
                history.replace('/login')
                return res.json()
                
            }
            else {
                res.json().then((data)=> {
                    let errormsg;
                    if(data && data.error && data.error.message){
                        errormsg=data.error.message
                    }
                    throw new Error(errormsg)
                })
            }

        }).then((data)=> {
            console.log(data)
        }).catch((err)=>{
              console.log(err)
        })

        

    }
  return (
    <>
        <div className='forgotpassword'>
            <form onSubmit={submitforgotemailhandler}>
                <div>
                    <label>enter email</label>
                    <input type="email" onChange={forgotemailhandler}></input>
                    {!isloading &&(<button type='submit'>Send</button>)}
                </div>
                { isloading && <p>loading</p>}
            </form>
        </div>
    </>
  )
}
