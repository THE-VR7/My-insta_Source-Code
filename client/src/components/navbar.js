import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import { Usercontext } from '../App';
// import keys from '../../../My Instagram/keys';

const Navbar = ()=>{
  const history = useHistory()
    const {state,dispatch} = useContext(Usercontext)
    const renderList = ()=>{
      if(state)
      {
        return [ 
        <li key="4"><Link to="/myfollowingpost">My Following Posts</Link></li>,
        <li key="1"><Link to="/profile">Profile</Link></li>,
        <li key="2"><Link to="/createpost">Create Post</Link></li>,
        <li key="3">
          <button className="btn  #c62828 red darken-3" 
          onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/login')
          }}>
                Logout
          </button>
        </li>
        ]
      }
      else
      {
        return [
        <li key="3"><Link to="/login">Login</Link></li>,
        <li key="4"><Link to="/signup">Signup</Link></li>
        ]
      }
    }
    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/login"} className="brand-logo left">My Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;