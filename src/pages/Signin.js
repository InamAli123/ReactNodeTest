import React,{useState,useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import {Form,Col,Button,Alert} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
const SignInForm = styled.section`
width:50%;
background-color:#eee;
margin:0 auto;
padding:50px;
text-align:left;
`;



  // const handleSubmit = () => {
  //   alert('Hello world');
  // }
  const schema = Yup.object({
    email : Yup.string().trim().required().email(),
    password : Yup.string().trim().required().min(5),

  });
const Signin = (props) => {
const [err,setError] = useState({});
//const {state,dispatch} = React.useContext(Store);
// useEffect(()=>{
//   console.log(document.cookie);
// },[])
  const handleSubmit = (values) => {
    axios({
      method : 'POST',
      url : 'http://localhost:4000/signin',
      data : values,
    })
    .then((response)=>{
   if(response.data.status===false){
      console.log('Error Occured');
    }
    else {
      if(response.data.status==true){
        console.log(response.data.token);
        document.cookie = `token=${response.data.token};path='/'`;
        props.history.push('/');
      }
      else {
        console.log('Token Generation failed, Try Again Logging in');
      }
    }

  });
  }
return (
<div style={{minHeight:'500px',paddingTop:'120px',paddingBottom:'200px'}}>
<SignInForm>
<h1 align="center">Sign in</h1>
<Formik
validationSchema = {schema}
onSubmit = {handleSubmit}
initialValues = {{

  email : '',
  password:'',

}}
>
{({
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
  isValid
})=>(

<Form noValidate  onSubmit={handleSubmit}>


<Form.Group as={Col} md="12">
<Form.Label>Email</Form.Label>
<Form.Control
type="text"
name = "email"
value = {values.email}
onChange = {handleChange}
isInvalid = {!!errors.email}
/>
<Form.Control.Feedback type="invalid">
{errors.email}
</Form.Control.Feedback>
{(Object.keys(err).length!==0 && Object.values(err).indexOf('email') > -1) ? <span style={{color:'red'}}>{err.errorMsg}</span> : ''}
</Form.Group>


<Form.Group as={Col} md="12">
<Form.Label>Password</Form.Label>
<Form.Control
type="password"
name = "password"
value = {values.password}
onChange = {handleChange}
isInvalid = {!!errors.password}
/>
<Form.Control.Feedback type="invalid">
{errors.password}
</Form.Control.Feedback>

{(Object.keys(err).length!==0 && Object.values(err).indexOf('password') > -1) ? <span style={{color:'red'}}>{err.errorMsg}</span> : ''}
</Form.Group>



<Button type="submit" style={{marginTop:10}}>Submit</Button>

</Form>

)}

</Formik>
</SignInForm>
</div>
)


}
export default Signin
