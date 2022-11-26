import React ,{ Component } from "react";
import {connect} from "react-redux";
import {addPost,removePost,editPost,removeAll} from "./Redux/Actions";
import './App.css';

class App extends Component {

    state={
        post:{
            title:"",
            description:""
        },
        editedPost:{
            title:"",
            description:""
        }
    }

    //Hundle Title When I Add Post 
    handleTitle=(e)=>{
        this.setState({
            ...this.state,
            post:{
                ...this.state.post,
                title:e.target.value,
            }
        })
    }

    //Hundle Description When I Add Post
    handleDescription=(e)=>{
        this.setState({
            ...this.state,
            post:{
                ...this.state.post,
                description:e.target.value,
            }
        })
    }

    //Hundle Submit When I Add Post And Submit It
    handleSubmit=(e)=>{
        e.preventDefault();
        const post={
            title:this.state.post.title,
            description:this.state.post.description
        }

        if(post.title!=="" && post.description!==""){
            this.props.addPost(post);
            this.setState({
                ...this.state,
                post:{
                    title:"",
                    description:"",
                }
            })
        }
    }

    //Hundle Title When I Edit Post 
    handleEditedTitle=(e)=>{
        this.setState({
            ...this.state,
            editedPost:{
                ...this.state.editedPost,
                title:e.target.value,
            }
        })
    }

    //Hundle Description When I Edit Post
    handleEditedDescription=(e)=>{
        this.setState({
            ...this.state,
            editedPost:{
                ...this.state.editedPost,
                description:e.target.value,
            }
        })
    }

    //Hundle Submit When I Edit Post And Submit It
    handleEditedSubmit=(e,index)=>{
        e.preventDefault();
        const post={
            title:this.state.editedPost.title,
            description:this.state.editedPost.description
        }

       if(post.title!=="" && post.description!==""){
            this.props.editPost(post,index);
            this.setState({
                ...this.state,
                editedPost:{
                    title:"",
                    description:"",
                }
            })
            document.getElementById(`edit-form-${index}`).style.display="none"
            document.getElementById(`edit-${index}`).style.display="inline"
            document.getElementById(`remove-${index}`).style.display="inline"
        }
    }

    //Hundle Remove Post 
    handleRemovePost=(index)=>{
        this.props.removePost(index)
    }

    //Hundle Edit Post 
    handleEditPost =(post,index)=>{
        
        this.setState({
            ...this.state,
            editedPost:{
                title:post.title,
                description:post.description,
            }
        })

        let forms=document.getElementsByClassName(`edit-form`);
        for(let i=0;i<forms.length;i++){
            forms[i].style.display="none"
        }

        let edits=document.getElementsByClassName(`edit`);
        for(let i=0;i<edits.length;i++){
            edits[i].style.display="inline"
        }

        let removes=document.getElementsByClassName(`remove`);
        for(let i=0;i<removes.length;i++){
            removes[i].style.display="inline"
        }

        document.getElementById(`edit-form-${index}`).style.display="block"
        document.getElementById(`edit-${index}`).style.display="none"
        document.getElementById(`remove-${index}`).style.display="none"
    }

    render(){
        //console.log(this.props);
        //console.log(this.state);

        // Get Posts From Redux
        const posts=this.props.posts.map((post,index)=>{
            return(
                <div className="app-post" id={index} key={index}>
                    <h3 className="app-post-title">{post.title}</h3>
                    <p className="app-post-desc">{post.description}</p>

                    <button className="remove" id={`remove-${index}`} onClick={()=>this.handleRemovePost(index)}>
                        <i className="fa fa-trash-alt"></i>
                    </button>

                    <button className="edit" id={`edit-${index}`} onClick={()=>this.handleEditPost(post,index)}>
                        <i className="fa fa-edit"></i> 
                    </button>

                    <form className="edit-form" id={`edit-form-${index}`} onSubmit={(e)=>this.handleEditedSubmit(e,index)} style={{display:"none"}}>
                        <div className="edit-form-item">
                            <input type="text" value={this.state.editedPost.title} onChange={this.handleEditedTitle} placeholder="Retype Post Title.."/>
                        </div>
                        <div className="edit-form-item">
                            <input type="text" value={this.state.editedPost.description} onChange={this.handleEditedDescription} placeholder="Retype Post Description.."/>
                        </div>
                        <div className="edit-form-item">
                            <button type="submit">
                                <i className="fa fa-check-double"></i>
                            </button>
                        </div>
                    </form>
                </div>
            )
        })

        return ( 
            <div className = "app" >
                <h1 className="app-head">Redux App Without Hooks </h1>
                <h2 className="app-desc">Type Awesome Posts <i className="fa fa-clipboard-list"></i></h2>

                <form className="app-form" onSubmit={this.handleSubmit}>
                    <div className="app-form-item">
                        <input type="text" value={this.state.post.title} onChange={this.handleTitle} placeholder="Type Post Title.."/>
                    </div>

                    <div className="app-form-item">
                        <input type="text" value={this.state.post.description} onChange={this.handleDescription} placeholder="Type Post Description.."/>
                    </div>

                    <div className="app-form-item">
                        <button type="submit" >
                            <i className="fa fa-pencil-alt"></i>
                        </button>
                    </div>
                </form>

                <div className="app-posts">
                    {this.props.posts.length > 0
                        ? posts.reverse()
                        :<h2 className="app-empty">No Posts To Show <i className="fa fa-theater-masks"></i></h2>
                    }
                </div>

                <div div className="app-cleare">
                    <button onClick={()=> this.props.removeAll()}>
                        <i className="fa fa-undo"></i>
                    </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{ //Here Read cRud! 
    return {
        posts:state
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        addPost: (post) => dispatch(addPost(post)), //Here Create Crud!
        removePost: (id) => dispatch(removePost(id)), //Here Delete cruD!
        editPost: (post,id) => dispatch(editPost(post,id)), //Here Update crUd!
        removeAll: () => dispatch(removeAll()), //Here Delete cruD! 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);

/*
    Inittial App Befor Starting

    <div className = "app" >
        <h1 className="app-head"> Redux <span>CRUD</span> App Without Hooks!  </h1>
        <h2 className="app-desc">Type Your Awesome Posts</h2>

        <form className="app-form">
            <div className="app-form-item">
                <input type="text" placeholder="Type Post Title.."/>
            </div>
            <div className="app-form-item">
                <input type="text" placeholder="Type Post Description.."/>
            </div>
            <div className="app-form-item">
                <input type="submit" value="Add"/>
            </div>
        </form>

        <div className="app-posts">
            <div className="app-post">
                <h3 className="app-post-title">post title</h3>
                <p className="app-post-desc">post desc </p>
                <button className="edit">Edit</button>
                <button className="remove">Remove</button>
                <form className="edit-form">
                    <div className="edit-form-item">
                        <input type="text" placeholder="Retype Post Title.."/>
                    </div>
                    <div className="edit-form-item">
                        <input type="text" placeholder="Retype Post Description.."/>
                    </div>
                    <div className="edit-form-item">
                        <input type="submit" value="Update"/>
                    </div>
                </form>
            </div>
            <div className="app-post">
                <h3 className="app-post-title">post title</h3>
                <p className="app-post-desc">post desc </p>
                <button className="edit">Edit</button>
                <button className="remove">Remove</button>
                <form className="edit-form">
                    <div className="edit-form-item">
                        <input type="text" placeholder="Retype Post Title.."/>
                    </div>
                    <div className="edit-form-item">
                        <input type="text" placeholder="Retype Post Description.."/>
                    </div>
                    <div className="edit-form-item">
                        <input type="submit" value="Update"/>
                    </div>
                </form>
            </div>
        </div>

        <div div className="app-cleare">
            <button>Remove All</button>
        </div>

    </div>

    /////////////////////////////////////////////

    body{
        font-family:'Courier New', Courier, monospace;
    }
    .app{
        width:80%;
        margin: 0 auto;
        background-color: #f5f5f5;
        text-align: center;
        box-shadow: 0px 5px 10px #ddd;
    }
    .app-head{
        color: rgb(250, 250, 250);
        margin-top: 0;
        background: #333;
        padding: 15px 0px;
    }

    .app-desc{
        color: #3030be;
    }
    .app-form .app-form-item,
    .app-posts .app-post .edit-form-item {
        margin: 5px 0px;
    }
    .app-form .app-form-item input[type="text"],
    .app-posts .app-post .edit-form .edit-form-item input[type="text"]{
        width: 38%;
        padding: 8px;
        border: none;
        border-radius: 4px;
    }
    .app-form .app-form-item button,
    .app-posts .app-post .edit-form .edit-form-item button{
        width: 40%;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        background-color: #3030be;
        padding: 6px;
        color: #ddd;
        cursor: pointer;
    }
    .app-posts .app-post .edit-form .edit-form-item button{
        width: 52%;
    }
    .app-posts{
        margin:20px 0px;
    }
    .app-posts .app-empty{
        color: #dd2553;
    }
    .app-posts .app-post{
        padding: 15px 0px;
        width: 80%;
        margin: auto;
        box-shadow: 0px 0px 2px #bbb;
    }
    .app-posts .app-post .app-post-title{
        font-size: 18px;
        margin: 0;
        color: #333;
    } 
    .app-posts .app-post .app-post-desc{
        color: #444;
        line-height: 1.5;
    } 
    .app-posts .app-post button{
        width: 70px;
        margin: 0px 2px;
        border: none;
        font-size: 12px;
        padding: 4px;
        border-radius: 4px;
        color: #ddd;
        cursor: pointer; 
    }
    .app-posts .app-post button.edit{
        background-color:#333;
    }
    .app-posts .app-post button.remove{
        background-color: rgb(221 37 83);
    }
    .app-posts .app-post .edit-form{
        margin-top:15px;
    }
    .app-posts .app-post .edit-form .edit-form-item input[type="text"]{
        width:50%;
    }
    .app-posts .app-post .edit-form .edit-form-item input[type="submit"]{
        width: 52%;
    }
    .app-cleare button{
        margin-bottom: 20px;
        font-size: 12px;
        background-color: #dd2553;
        border: none;
        width: 40%;
        padding: 6px;
        color: #ddd;
        border-radius: 4px;
        cursor: pointer;
    }
*/