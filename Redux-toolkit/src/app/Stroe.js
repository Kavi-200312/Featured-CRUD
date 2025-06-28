import postReducer from "../features/posts/PostSlice";
import UserReducer from "../features/user/UserSlice";
import { configureStore } from "@reduxjs/toolkit";
export const Store = configureStore({
    reducer:{
        posts: postReducer,
        users: UserReducer,
    }
})