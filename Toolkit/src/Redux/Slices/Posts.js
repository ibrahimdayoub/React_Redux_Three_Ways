import {createSlice} from "@reduxjs/toolkit";

//three Functions To Handle My Posts In Local Storege
const setLocaly=(state)=>{
    localStorage.setItem(`length`,state.length);
    for(let i=0;i<state.length;i++){
        localStorage.setItem(`${i}-title`,state[i].title);
        localStorage.setItem(`${i}-description`,state[i].description);
    }
}

const resetLocaly=()=>{
    let length=localStorage.getItem("length");
    for(let i=0;i<length;i++){
        localStorage.removeItem(`${i}-title`);
        localStorage.removeItem(`${i}-description`);
    }
}

const getLocaly=()=>{
    let localState=[];
    let length=localStorage.getItem("length");
    for(let i=0;i<length;i++){  
        let localObject={
            title:localStorage.getItem(`${i}-title`),
            description:localStorage.getItem(`${i}-description`),
        };
        localState.push(localObject);
    }
    return localState
}

//InitialState As It Like But If There Are Values In Local Storege Then The Deffrence Is Appear
let initialState=[
    {
        title:"Default Title You Can Remove/Edit It",
        description:"Default Description You Can Remove/Edit It" 
    }
];

if(getLocaly().length!==0){
    initialState=getLocaly();
    //console.log(getLocaly());
}

const posts=createSlice({
    name:"posts",
    initialState:initialState,
    reducers:{
        addPost:(state,action)=>{
            console.log(posts.getInitialState())
            //console.log(action);
            resetLocaly(); 
            setLocaly([...state,action.payload]);
            return [...state,action.payload]; 
        },
        removePost:(state,action)=>{
            //console.log(action);
            let afterRemoving= state.filter((post,index)=>{
                return index!==action.payload;
            });
            resetLocaly(); 
            setLocaly(afterRemoving);
            return afterRemoving;
        },
        editPost:(state,action)=>{
            //console.log(action);
            let afterEditing=state.map((post,index)=>{
                if(index===action.payload.index){
                   return {
                        title:action.payload.readyPost.title,
                        description:action.payload.readyPost.description,
                    }
                }
                return post;
            });
            resetLocaly(); 
            setLocaly(afterEditing);
            return afterEditing;
        },
        removeAll:()=>{
            resetLocaly(); 
            setLocaly([]);
            return [];
        }
    }
})

export const {addPost,removePost,editPost,removeAll} = posts.actions
export default posts.reducer;