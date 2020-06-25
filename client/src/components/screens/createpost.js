import React,{useState,useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import M from 'materialize-css'; 

const Createpost = () =>{
        const history = useHistory()
        const [title,setTitle] = useState("")
        const [body,setBody] = useState("")
        const [image,setImage] = useState("")
        const [url,setUrl] = useState("")

        useEffect(()=>{
          if(url)
          {
            fetch("/createpost",{
              method:"post",
              headers:
              {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                title,
                body,
                pic:url
              })
            }).then(res=>res.json())
            .then(data=>{
              console.log(data)
              if(data.error)
              {
                 M.Toast.dismissAll();
                 const toastHTML = `<span>${data.error}</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
                  M.toast({html:toastHTML,classes:"#c62828 red darken-3 rounded"})
              }
              else
              {
                const toastHTML = `<span>Created Post Successfully</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
                M.toast({html: toastHTML,classes:"#388e3c green darken-2 rounded"})
                history.push('/')
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        },[url])

        const postdetails = ()=>{
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
                setUrl(data.url)
            })
            .catch(err=>{
                console.log(err)
        })   
      }
        
    return (
        <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
           <input 
           type="text"
            placeholder="title"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
           <input
            type="text"
             placeholder="body"
             onChange={(e)=>setBody(e.target.value)}
             value={body}
             />
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postdetails()}
            
            >
                Submit post
            </button>
        </div>    
    )

}


export default Createpost;