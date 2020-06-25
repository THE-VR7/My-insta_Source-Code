import React,{useState,useContext} from 'react';
import {Link,useHistory } from 'react-router-dom';
import M from 'materialize-css'; 
import { Usercontext} from '../../App'


const Login = ()=>{
  const {state,dispatch} = useContext(Usercontext) 
  const history = useHistory()
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const Postdata = ()=>{
      if (email!=="" &&  !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
      {
        const toastHTML = `<span>Invalid Email</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
         M.toast({html:toastHTML ,classes:"#c62828 red darken-3 rounded"})
        return
        }

      fetch("/login",{
        method:"post",
        headers:
        {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          password,
          email
        })
      }).then(res=>res.json())
      .then(data=>{
        // console.log(data)
        if(data.error)
        {
           M.Toast.dismissAll();
           const toastHTML = `<span>${data.error}</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
            M.toast({html:toastHTML,classes:"#c62828 red darken-3 rounded"})
        }
        else
        {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          const toastHTML = `<span>Login Successfull</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
          M.toast({html: toastHTML,classes:"#388e3c green darken-2 rounded"})
          history.push('/')
        }
      }).catch(err=>{
        console.log(err)
      })
    }
    return (
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
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
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>Postdata()}>
                Login
            </button>
            <h5>
                <Link to="/signup">Dont have an account ?</Link>
            </h5>
    
        </div>
      </div>
    )
}




export default Login;