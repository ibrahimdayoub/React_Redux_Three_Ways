import {configureStore} from '@reduxjs/toolkit'
import posts from "./Slices/Posts"

const store=configureStore({
    reducer:{
        posts:posts,
    }
});

export default store;
