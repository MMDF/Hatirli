import { Component } from 'preact';
import firebase from './firebase.js';
import SignupComponent from './pagedraw/signup.js';
import { bind } from 'decko';
import linkState from 'linkstate';


export default class Signup extends Component {
    constructor(props) {
        super(props);
        if (firebase.auth().currentUser) {
            return props.history.push('profil');
        }
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                return props.history.push('profil');
            }
        });
    }
    render({history},{email, pass, username, passagain}) {
        return (<SignupComponent history={history} onPAC={linkState(this,"passagain")}    
            onPC={linkState(this,"pass")}
            onEC={linkState(this,"email")}
            onUC={linkState(this,"username")}
            email={email}
            passagain={passagain}
            pass={pass}
            username={username}
            signup={this.signup}
        />);
    }
    @bind
    signup() {
        if(this.state.pass==this.state.passagain){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((user)=>{
                user.updateProfile({displayName:this.state.username});
            })
        }
    }
}