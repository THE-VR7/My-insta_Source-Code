import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './components/screens/home';
import Profile from './components/screens/profile';
import UserProfile from './components/screens/UserProfile';
import Login from './components/screens/login';
import Signup from './components/screens/signup';
import Createpost from './components/screens/createpost';
import SubsPosts from './components/screens/subspost';
import {initialstate,reducer} from './reducers/UserReducer';

export  const Usercontext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(Usercontext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user)
    {
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else
    {
      history.push('/login')
    }
  },[])
  return(
   <Switch>
    <Route exact path="/" >
      <Home />
    </Route>
    <Route exact path="/profile" >
      <Profile />
    </Route>
    <Route path="/login" >
      <Login />
    </Route>
    <Route path="/signup" >
      <Signup />
    </Route>
    <Route path="/createpost" >
      <Createpost />
    </Route>
    <Route path="/profile/:userid" >
      <UserProfile />
    </Route>
    <Route path="/myfollowingpost" >
      <SubsPosts />
    </Route>
  </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialstate)
  return (
  <Usercontext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar />
    <Routing />    
    
    
    </BrowserRouter>
  </Usercontext.Provider>
  );
}

export default App;
