import { configureStore } from '@reduxjs/toolkit';


import itemslice from './item-slice';

const store=configureStore({
    reducer:{item:itemslice.reducer}
})

export default store;