import {createStore} from "redux";
import posts from "./Reducers/Posts"

const store=createStore(posts);

export default store;