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
    name : Yup.string().trim().required(),
    email : Yup.string().trim().required().email(),

  });
const Addstudent = (props) => {
  const [err,setError] = useState({});
  const [loading,setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    axios({
      method : 'POST',
      url : 'http://localhost:4000/add_student',
      data : values,
        headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+props.token,
    }
    })
    .then((response)=>{

     if(response.data.flag===true){
     
     alert(response.data.response);  
     setLoading(false); 
  
     }
    else {
     
     alert(response.data.response);
     console.log(response.data.errors);
     // var newErr = {errorField:response.data.info.field,errorMsg:response.data.info.message};
     // setError(prevState => ({...prevState,...newErr}));
     setLoading(false);

     // if(props.location.state && props.location.state.from.pathname!=='/logout'){
     //   console.log(props.location.state.from.pathname);
     //   props.history.push(props.location.state.from.pathname);
     //   //window.location = 'http://localhost:3000'+props.location.state.from.pathname;
     // }
     // else {
     //   //window.location = 'http://localhost:3000';
     //   props.history.push('/');
     // }

    }

  });
  }
return (
<div style={{minHeight:'500px',paddingTop:'120px',paddingBottom:'200px'}}>
<SignInForm>
<h1 align="center">Add Student</h1>
<Formik
validationSchema = {schema}
onSubmit = {handleSubmit}
initialValues = {{

  name : '',
  email:'',
  registerdate:'',

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
<Form.Label>Name</Form.Label>
<Form.Control
type="text"
name = "name"
value = {values.name}
onChange = {handleChange}
isInvalid = {!!errors.name}
/>
<Form.Control.Feedback type="invalid">
{errors.name}
</Form.Control.Feedback>
{(Object.keys(err).length!==0 && Object.values(err).indexOf('name') > -1) ? <span style={{color:'red'}}>{err.errorMsg}</span> : ''}
</Form.Group>


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
<Form.Label>Register Date</Form.Label>
<Form.Control
type="date"
name = "registerdate"
value = {values.registerdate}
onChange = {handleChange}
isInvalid = {!!errors.registerdate}
/>
<Form.Control.Feedback type="invalid">
{errors.registerdate}
</Form.Control.Feedback>

{(Object.keys(err).length!==0 && Object.values(err).indexOf('registerdate') > -1) ? <span style={{color:'red'}}>{err.errorMsg}</span> : ''}
</Form.Group>



<Button type="submit" style={{marginTop:10}}>{loading ? 'Adding...' :'Add'}</Button>

</Form>

)}

</Formik>
</SignInForm>
</div>
)


}
export default Addstudent;
