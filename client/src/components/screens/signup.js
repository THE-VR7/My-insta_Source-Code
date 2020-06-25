import React,{useState,useEffect} from 'react';
import {Link,useHistory } from 'react-router-dom';
import M from 'materialize-css'; 
const Signup = ()=>{
    const history = useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    
    useEffect(()=>{
      if(url)
      {
        uploadfields()
      }
    },[url])


    const uploadpic = ()=>{
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

    const uploadfields = ()=>{
      if(email!=="" &&  !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
        const toastHTML = `<span>Invalid Email</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
         M.toast({html:toastHTML ,classes:"#c62828 red darken-3 rounded"})
        return
        }

      fetch("/signup",{
        method:"post",
        headers:
        {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name  ,
          password,
          email,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
           M.Toast.dismissAll();
           const toastHTML = `<span>${data.error}</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
            M.toast({html:toastHTML,classes:"#c62828 red darken-3 rounded"})
        }
        else
        {
          const toastHTML = `<span>${data.message}</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
          M.toast({html: toastHTML,classes:"#388e3c green darken-2 rounded"})
          history.push('/login')
        }
      }).catch(err=>{
        console.log(err)
      })
    }

    const Postdata = ()=>{
      if(image)
      {
        uploadpic()
      }
      else
      {
        uploadfields()
      }
    }
    return (
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
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
            onClick={()=>Postdata()}
            >
                Signup
            </button>
            <h5>
                <Link to="/login">Already Have an account</Link>
            </h5>
    
        </div>
      </div>

    )
}


export default Signup;