import React,{useEffect,useState,useContext} from 'react';
import { Usercontext } from '../../App';
import {useParams} from 'react-router-dom';

const UserProfile = ()=>{
    const [userprofile,setProfile]=useState(null)
    const {state,dispatch} = useContext(Usercontext)
    const {userid} = useParams()
    const [showfollow,setShowfollow]=useState(state?!state.following.includes(userid):true)

    useEffect(() => {
        // console.log(userid)
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => { 
                // console.log(result)
                setProfile(result)
            })
    }, [])

    const followuser = ()=>{
        fetch('/follow',{
            method:"put",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data);
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevstate)=>{
                return{
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:[...prevstate.user.followers,data._id]
                    }
                }
            })
            setShowfollow(false)
        })
    }
    const unfollowuser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data);
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevstate)=>{
                const newfollower = prevstate.user.followers.filter(item=>item !== data._id)
                return{
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:newfollower
                    }
                }
            })
            setShowfollow(true)
        })
    }
    return (
        <>
        {userprofile 
        ?  
        
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

           
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={userprofile.user.pic}
                   alt=""  />
                 
               </div>
               <div>
                    <h4>{userprofile.user.name}</h4>
                   {/* <h5>{state?state.email:"loading"}</h5> */}
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userprofile.posts.length} posts</h6>
                       <h6>{userprofile.user.followers.length} followers</h6>
                       <h6>{userprofile.user.following.length} following</h6>
                   </div>
                   {showfollow
                   ?
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                    onClick={()=>followuser()}
                    style={{margin:"10px"}}
                    >
                             Follow
                         </button>
  
                    :
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                    onClick={()=>unfollowuser()}
                    style={{margin:"10px"}}>
                             UnFollow
                         </button> 
                }

               </div>
           
        
            
            </div>      
           <div className="gallery"
        //    style={{padding:"5px auto",
        //        border:"5px solid black"
        //    }}
           >
               {
                   userprofile.posts.map(item=>{
                        return (
                            <img alt="" key={item._id} src={item.photo} style={{width:"40%",height:"40%",margin:"10px"}} />
                       )
                   })
               }
               

           </div>
       </div>
        
        : <h2>Loading....</h2>}

       </>
    )
}




export default UserProfile;