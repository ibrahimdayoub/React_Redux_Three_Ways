import {ADD_POST,REMOVE_POST,EDIT_POST,REMOVE_ALL} from "./Types";

//Here We Can Use Redux Thunk With The Actions

export const addPost=(post)=>{
    const action={
        type:ADD_POST,
        post, //like post:post,
    }
    return action;
}

export const removePost=(id)=>{
    const action={
        type:REMOVE_POST,
        id,
    }
    return action;
}

export const editPost=(post,id)=>{
    const action={
        type:EDIT_POST,
        post,
        id,
    }
    return action;
}

export const removeAll=()=>{
    const action={
        type:REMOVE_ALL,
    }
    return action;
}