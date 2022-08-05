import { createSlice } from '@reduxjs/toolkit';

const itemslice=createSlice({
    name:'item',
    initialState:{items:[{}]},
    reducers:{
        additem(state,action){
            const newitem=action.payload
            state.items=[...state.items,newitem]
        }
    }
})

export const itemaction=itemslice.actions

export default itemslice;