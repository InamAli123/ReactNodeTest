import {React,useEffect,useState} from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import axios from 'axios';
import {NavLink} from 'react-router-dom';


const H1 = styled.h1`
text-align:center;
margin-top:20px;
`


const Students = (props) => {
const [students,setStudents] = useState([]);

useEffect(()=>{
axios({
	method : 'GET',
	url :'http://localhost:4000/students',
   headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+props.token,
    }
})
.then((response)=>{
	setStudents(response.data);
})

},[]);

const deleteStudent = (id) => {
axios({
  method : 'GET',
  url : 'http://localhost:4000/delete_student/'+id,
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+props.token,
    }
})
.then((response)=>{
  if(response.data.deleted==true){
    alert(response.data.response);
    let stuArray = Object.assign([],students);
    let objIndex = stuArray.findIndex(x=>x.id==id);
    stuArray.splice(objIndex,1);
    setStudents(stuArray);
  }
  else {
    alert(response.data.response);
  }
})
}

	return (

<div>
<H1>Students</H1>

<div style={{width:'60%',margin:'0 auto'}}>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Register date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {students.map((val,index)=>{
  	return (
<tr key={index}>
      <td>{index}</td>
      <td>{val.name}</td>
      <td>{val.email}</td>
      <td>{moment(val.reg_date).utc().format('YYYY-MM-DD')}</td>
      <td><Button variant="primary" onClick={()=>props.history.push('/edit-student/'+val.id)}>Edit</Button> 
      <Button variant="danger" onClick={()=>deleteStudent(val.id)}>Delete</Button></td>
    </tr>

  		)
  })}
    

  </tbody>
</Table>

</div>


</div>
		)
}
export default Students;