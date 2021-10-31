import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
const Logout = (props) => {
const [isLoading,setIsLoading] = useState(false);

 useEffect(()=>{
   console.log('useEffect runs');
setIsLoading(true);
 document.cookie = "token=; Max-Age=0; path=/;";
   setIsLoading(false);
 },[])

if(isLoading){
  return null;
}

return <Redirect to='/signin' />
//return props.location.state ? <Redirect to={props.location.state.from.pathname} />: <Redirect to  = '/' />

}

export default Logout;
