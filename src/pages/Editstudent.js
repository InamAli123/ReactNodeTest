import React,{useState,useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import {Form,Col,Button,Alert} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
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
const Editstudent = (props) => {
const [err,setError] = useState({});
const [student,setStudent] = useState({});
const [loading,setLoading] = useState(false);
const Id = props.match.params.id;
//const {state,dispatch} = React.useContext(Store);
useEffect(()=>{
 
  axios({
    method  : 'GET',
    url : 'http://localhost:4000/get_student?student_id='+Id,
     headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+props.token,
    }
  })
  .then((response)=>{
    console.log(response);
    setStudent({...response.data[0]});

  })
},[]);


  const handleSubmit = (values) => {
 
  setLoading(true);
    console.log(values);
    axios({
      method : 'POST',
      url : 'http://localhost:4000/edit_student?student_id='+Id,
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
<h1 align="center">Edit Student</h1>
<Formik
enableReinitialize = {true}
validationSchema = {schema}
onSubmit = {handleSubmit}

initialValues = {{

  name : student.name,
  email:student.email,
  registerdate: student.reg_date,

}}
>
{({
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
  isValid,
})=>(

<Form noValidate  onSubmit={handleSubmit}>

<Form.Group as={Col} md="12">
<Form.Label>Name</Form.Label>
<Form.Control
type="text"
name = "name"
defaultValue = {values.name}
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
defaultValue = {values.email}
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
value = {student.reg_date!==''?moment(values.registerdate).utc().format('YYYY-MM-DD') : ''}
onChange = {handleChange}
isInvalid = {!!errors.registerdate}
/>
<Form.Control.Feedback type="invalid">
{errors.registerdate}
</Form.Control.Feedback>

{(Object.keys(err).length!==0 && Object.values(err).indexOf('registerdate') > -1) ? <span style={{color:'red'}}>{err.errorMsg}</span> : ''}
</Form.Group>



<Button type="submit" style={{marginTop:10}}>{loading?'Editing...' : 'Edit'}</Button>

</Form>

)}

</Formik>
</SignInForm>
</div>
)


}
export default Editstudent;
