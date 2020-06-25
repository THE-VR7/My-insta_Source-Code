import React, { useState, useEffect,useContext } from 'react';
import { Usercontext } from '../../App';
import {Link} from 'react-router-dom';


const Home = () => {
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(Usercontext)
    useEffect(() => {
        fetch('/subpost', {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => { 
                // console.log(result)
                setData(result.posts)
            })
    }, [])
    const likepost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
            .then(res=>res.json())
            .then(result=>{
                // console.log(result)
                const newdata = data.map(item=>{
                    if(item._id===result._id)
                    {
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newdata)
            })
        
    }
    const unlikepost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result=>{
                // console.log(result)
                const newdata = data.map(item=>{
                    if(item._id===result._id)
                    {
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newdata)
            })
    
    }
    const comment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text,
                postId
            })
        }).then(res=>res.json())
            .then(result=>{
            // console.log(result)
            const newdata = data.map(item=>{
                if(item._id===result._id) 
                {
                    return result
                }
                else{
                    return item
                }
            })
            setData(newdata)
        }).catch(err=>{
            console.log(err)
        })
    }
    // 
    const deletepost = (postId)=>{
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newdata = data.filter(item=>{
                return item._id !== result._id
            })
            // console.log(newdata)
            setData(newdata)
        })
    }

    return (
        <div className="Home">
            {
                data.map((item)=>{
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5><Link to={item.postedby._id !== state._id?"/profile/"+item.postedby._id:"/profile"}>{item.postedby.name}</Link> 
                            {item.postedby._id == state._id 
                            && <i className="material-icons" style={{ float:"right",color: "red" }}
                            onClick = {()=>deletepost(item._id)}
                            >delete</i>
                            }
                            </h5>
                            <div className="card-image">
                                <img
                                    src={item.photo}
                                     alt="" />
                            </div>
                            <div className="card-content">
                                {
                                (item.likes.includes(state._id))
                                ?
                                <i className="material-icons" 
                                onClick={()=>{unlikepost(item._id)}}
                                >thumb_down</i>
                                :
                                <i className="material-icons" style={{ color: "red" }}
                                onClick={()=>{likepost(item._id)}}
                                >thumb_up</i>
                                }
                                <h6>{item.likes.length} Likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                            <h6 key={record._id}><span style={{fontWeight:500}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    comment(e.target[0].value,item._id)
                                }}> 
                                    <input type="text" placeholder="add a comment"  />
                            
                                </form>
                                </div>
                        </div>
                    )
                })
            }
        </div>
    )
}




export default Home;