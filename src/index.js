import { Component } from "preact";
import firebase from './firebase.js';
import 'preact/devtools';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import QuestionComponent from './pagedraw/questioncomponent.js';
import Navbar from './pagedraw/navbar.js';
import Homepage from './pagedraw/homepage.js';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Lessons from './lessons.jsx';
import './styles/index.scss';
import studypage from "./studypage.jsx";

class App extends Component {
	constructor(props) {
		super(props);
		firebase.auth().onAuthStateChanged((user)=>this.setState({user:user}))
	}
	render(props,{user}) {
		return (<Router>
			<div>
				<Route render={({history})=><Navbar history={history} username={!user ? null: user.displayName ? user.displayName : user.email}/>}/>
				<Switch>
					<Route exact path="/" component={Homepage}/>
					<Route path="/calisma" component={studypage}/>
					<Route path="/dersler" component={Lessons}/>
					<Route path="/sinif" component={()=><div>Bu özellik tamamlandığında burada kayıt olduğunuz sınıfı ve öğrencilerini görebileceksiniz.</div>}/>
					<Route path="/giris" component={Login}/>
					<Route path="/kayit" component={Signup}/>
					<Route path="/profil" render={()=>user?(<div>{user.displayName} Hoşgeldin! Çalışma sayfana <Link to="/calisma">git</Link></div>):(<div>Henüz giriş yapmamışsınız. Lütfen <Link to="/giris">giriş</Link> yapınız ya da <Link to="/kayit">kayıt</Link> olunuz.</div>)}/>
				</Switch>
			</div>				
		</Router>);
	}
}

export default App;