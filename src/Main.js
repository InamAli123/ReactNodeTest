import {React} from 'react';
import Header from './includes/Header';
import Footer from './includes/Footer';
import Signin from './pages/Signin';
import Students from './pages/Students';
import Editstudent from './pages/Editstudent';
import Addstudent from './pages/Addstudent';
import Home from './pages/Home';
import Logout from './pages/Logout';
import {requireAuthentication} from './HOC/requireAuthentication';
import {restrictIfLogin} from './HOC/restrictIfLogin';
import {BrowserRouter as Router,Route} from 'react-router-dom'; 
import {Button} from 'react-bootstrap';
const Main = (props) => {

  return (
<div>



<div>
<Router>
<Route path='/' exact component = {requireAuthentication(Home)} />
<Route path='/signin' exact component = {restrictIfLogin(Signin)} />
<Route path='/students' exact component={requireAuthentication(Students)} />
<Route path='/edit-student/:id' exact component={requireAuthentication(Editstudent)} />
<Route path='/add-student' exact component={requireAuthentication(Addstudent)} />
<Route path='/logout' exact component = {requireAuthentication(Logout)} />

</Router>


</div>


</div>
  );
}

export default Main;