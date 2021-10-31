import {React} from 'react';
import Header from './Header';
import Footer from './Footer';
const Layout = (props) => {

return (
<div>
<Header {...props} />
<div style={{minHeight:'40vw'}}>
{props.children}
</div>
<Footer />


</div>


	)

}

export default Layout;