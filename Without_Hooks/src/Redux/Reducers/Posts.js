import {ADD_POST,REMOVE_POST,EDIT_POST,REMOVE_ALL} from "../Types";

//inittial state 
const initState=[
    {
        title:"Default Title You Can Remove/Edit It",
        description:"Default Description You Can Remove/Edit It" 
    }
];

//setLocaly is function save state in local storage and getLocaly feth it but resetLocaly reset everything  : [{k:"v",k:"v"},{k:"v",k:"v"}]
const setLocaly=(state)=>{
    localStorage.setItem(`length`,state.length);
    for(let i=0;i<state.length;i++){
        localStorage.setItem(`${i}-title`,state[i].title);
        localStorage.setItem(`${i}-description`,state[i].description);
    }
}
//ex: setLocaly(initState);

const resetLocaly=()=>{
    let length=localStorage.getItem("length");
    for(let i=0;i<length;i++){
        localStorage.removeItem(`${i}-title`);
        localStorage.removeItem(`${i}-description`);
    }
}
//ex: resetLocaly();

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
//ex: console.log(getLocaly());

const posts=(state=initState,action)=>{

    //if there are elements in local Storage
    if(getLocaly().length!==0){
        state=getLocaly();
        //console.log(getLocaly());
    }

    switch(action.type){
        case ADD_POST :{
            resetLocaly(); 
            setLocaly([...state,action.post]);
            return [...state,action.post]; 
        }
        case REMOVE_POST :{
            let afterRemoving= state.filter((post,index)=>{
                return index!==action.id;
            });
            resetLocaly(); 
            setLocaly(afterRemoving);
            return afterRemoving;
        }
        case EDIT_POST :{
            let afterEditing=state.map((post,index)=>{
                if(index===action.id){
                   return {
                        title:action.post.title,
                        description:action.post.description,
                    }
                }
                return post;
            });
            resetLocaly(); 
            setLocaly(afterEditing);
            return afterEditing;
        }
        case REMOVE_ALL :{
            resetLocaly(); 
            setLocaly([]);
            return []; 
        }

        default : return state;
    }
}

export default posts;