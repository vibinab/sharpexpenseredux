import React from 'react'
import "./Expensetrackeritem.css"


export const Expensetrackeritem = (props) => {


  return (
    <>
        <div className='expenseitem'>
          <ul className='expenseitem-list'>
            <li>{props.spend}</li>
            <li>{props.desc}</li>
            <li>{props.category}</li>
            {/* <li><button onClick={()=>props.ondelete(props.keyss)}>delete</button></li>
            <li>
                <button onClick={()=>props.onedit(props.keyss,props.spend,props.desc,props.category)}>
                    edit
                </button>
            </li> */}
          </ul>
        </div>
    </>
  )
}
