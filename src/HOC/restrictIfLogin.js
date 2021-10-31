
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Route,Redirect} from 'react-router-dom';
import Layout from '../includes/Layout';



export const restrictIfLogin = (Component) => {
  return (props)=>{
    console.log(props);
  
  //console.log(state.userData.flag+' '+state.userData.token+' '+state.userData.data);
 const [flag,setFlag] = useState(false);
 const [isTokenValidated,setIsTokenValidated] = useState(false);
 const [data,setData] = useState({});
 const [tokenState,setTokenState] = useState('');
useEffect(()=>{
  var x = document.cookie;
  var token = x.split('=');
  if(!x || token[0] !== 'token'){
     setFlag(false);
      setIsTokenValidated(true);
    console.log('upper executed');

  }

 else {
   console.log('lower executes');
     setTokenState(token[1]);
 //  var re = checkToken();
 // console.log(checkToken());
 axios({
    method : 'get',
    url : 'http://localhost:4000/verifyJwt',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+token[1],
    }
  })

  .then((response)=>{
      setFlag(true);
      setData({...data,...response.data.user});
      console.log(data);
      console.log(response.data.user);
  })
  .catch((err)=>{
    if(err.response.status===401){
      setFlag(false);

    }

  })
  .then(() => setIsTokenValidated(true));
}
  // setFlag(checkToken());
  // setLoading(false);
},[]);

if(!isTokenValidated){
  console.log('validated:'+isTokenValidated);
  console.log('flag:'+flag);

 return <h1>Loading....</h1>;
}

  return flag!==true ? <Component {...props} /> : <Redirect push to={{pathname: '/'}}/>
}

}
