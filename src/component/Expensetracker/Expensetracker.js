import React ,{useState,useEffect} from 'react'
import "./Expensetracker.css"
import { Expensetrackeritem } from './Expensetrackeritem';
import { useDispatch, useSelector } from 'react-redux';
import { itemaction } from '../../reduxstore/item-slice';
import axios from 'axios';


export const Expensetracker = () => {
    const dispatch=useDispatch();
    const items=useSelector((state)=>state.item.items)
    const [data,setdata]=useState({});




    useEffect(()=> {
        axios.get('https://expresstrackerredux-default-rtdb.firebaseio.com/items.json')
        .then((res)=>{
            console.log("get",res.data)
           let loaddata=[]
           let newdata={}
            for (const key in res.data){
                console.log("key",key[2])
            
                console.log("Data",res.data[key])
                res.data[key].body.key=key
                 loaddata.push(res.data[key].body)
                 
            }
            console.log("show data",loaddata.category)
           setdata(loaddata)
           
           
            
            // const loadedMovies=[];
            // for(const key in  res.data){
            //  loadedMovies.push({
            //    id:key,
            //    spend:res.data[key].spend,
            //    desc:res.data[key].desc,
            //    category:res.data[key].category,
            //  });
            // }
            // console.log(loadedMovies)
        })
        .catch((err)=> {
            console.log(err)
        })

    },[items])
   
    console.log("redux ",items)
    const [spend,setpend]=useState('');

    const[ desc,setdesc]=useState('');

    const[ category,setcategory]=useState('');

    const [dataapi,setdataapi]=useState([{}]);

    const spendhandler=(event)=> {
        setpend(event.target.value)
    }

    const deschandler=(event)=> {
        setdesc(event.target.value)
    }
    const categoryhandler=(event)=> {
        setcategory(event.target.value)
    }

    const expensehandler=(event)=> {
        event.preventDefault();
          const expensedata= {
            spend:spend,
            desc:desc,
            category:category
        }
       dispatch(itemaction.additem(expensedata))
        // const expensedata= {
        //     spend:spend,
        //     desc:desc,
        //     category:category
        // }
        // console.log(expensedata)
        // setdataapi(current=>[...current,expensedata])
        // console.log("list",dataapi)
        axios.post('https://expresstrackerredux-default-rtdb.firebaseio.com/items.json',{
            body:items,
        }
        )
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        
    }


  return (
    <>
         <div className='expensetracker'>
            <form onSubmit={expensehandler}>
                <div>
                    <label>spend</label>
                    <input type="number" onChange={spendhandler}
                    
                    ></input>
                </div>
                <div>
                    <label>desc</label>
                    <input type="text" onChange={deschandler}
                   
                    ></input>
                </div>
                <div>
                <label>category</label>
                <select name="category" onChange={categoryhandler}>
                <option></option>
                <option value="food">Food</option>
                 <option value="petrol">Petrol</option>
                 <option value="rent">Rent</option>
                </select>
                </div>
                <div className='submitbtn'>
                <button type='submit'>ADD</button>
                </div>
                {/* <div>
                    <p>{!error && {error}}</p>
                </div> */}
                
            </form>
        </div>
        <div>
        {
        items.map((d)=> {
            return (
                <Expensetrackeritem
                   
                    spend={d.spend}
                    desc={d.desc} 
                    category={d.category}
                    
                />
            )
        })
        }  
        </div>
    </>
  )
}
