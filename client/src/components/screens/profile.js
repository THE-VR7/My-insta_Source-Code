import React, { useEffect, useState, useContext } from 'react';
import { Usercontext } from '../../App';

const Profile = () => {
    const [mypics, setPics] = useState([])
    const [image, setImage] = useState("")
    const { state, dispatch } = useContext(Usercontext)
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setPics(result.posts)
            })
    }, [])
    
    useEffect(() => {
        if(image)
        {
            const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","imvr7")
        fetch("https://api.cloudinary.com/v1_1/imvr7/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            // console.log(data.url)
            // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            // dispatch({type:"UPDATEPIC",payload:data.url})
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify(
                {   
                    pic:data.url
                }) 
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})


            })
        })
        .catch(err=>{
            console.log(err)
        }) 
        }
    }, [image])


    const updatePhoto = (file) => {
        setImage(file)
        

    }

    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.pic : "Loading"}
                            alt="" />
                    </div>
                    <br/>
                        <div>
                            <h4>{state ? state.name : "loading"}</h4>
                            {/* <h5>{state?state.email:"loading"}</h5> */}
                            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                <h6>{mypics.length} posts</h6>
                                <h6>{state ? state.followers.length : 0} followers</h6>
                                <h6>{state ? state.following.length : 0} following</h6>
                            </div>

                        </div>
                </div>

                        <div className="file-field input-field" style={{margin:"10px"}}>
                            <div className="btn #64b5f6 blue darken-1">
                                <span>Uplaod Image</span>
                                <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item => {
                        return (
                            <img alt="" key={item._id} src={item.photo} style={{ width: "40%", height: "40%", margin: "10px" }} />
                        )
                    })
                }


            </div>
        </div>
    )
}




export default Profile;