import { Component } from 'preact';
import firebase from './firebase.js';
import Login from './pagedraw/login.js';
import { bind } from 'decko';
import linkState from 'linkstate';

export default class LoginComponent extends Component{
    constructor(props){
        super(props);
        if (firebase.auth().currentUser) {
            return props.history.push('profil');
        }
        this.state = {pass:"", email:""}
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                return props.history.push('profil');
            }
        });
    }
    render({history}, {pass, email}) {
        return (
            <Login login={this.login} history={history} email={email} pass={pass} onEC={linkState(this, "email")} onPC={linkState(this, "pass")}/>
        );
    }
    @bind
    login(){
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass);
        
    }

}