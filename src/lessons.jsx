import {Component} from 'preact';
import firebase from './firebase.js';
import Classes from './pagedraw/classes.js';
import Sections from './pagedraw/sections.js';
import {Switch, Route} from 'react-router-dom';
import { bind } from 'decko';
export default class Lessons extends Component {
    constructor(props) {
        super(props);
        if(!firebase.auth().currentUser) {
            this.props.history.push('/giris');
        }
        firebase.database().ref('/lessons').once('value',(data)=>{console.log(data.val());this.setState({lessons:data.val()})});
        firebase.database().ref('/sections').on('value', (data)=>{this.setState({sections:data.val()})})
    }
    render({match}, {lessons, sections}) {
        return (
            <div>
                {!sections && !lessons ? <div>Yükleniyor...</div>: null }
                <Switch>
                    <Route exact path="/dersler" render={({history})=><Classes history={history} list={lessons||[]}/>}/>
                    <Route path="/dersler/:ders" 
                    render={({match})=><Sections addSection={this.addSection.bind(null, match.params.ders)}
                    list={sections ? Object.values(sections).filter((e)=>e.subject==match.params.ders).map((e)=>e.name):['Yükleniyor...']}/>}/>
                </Switch>
            </div>
        );
    }
    @bind
    addSection(subject, section) {
        var key = Object.keys(this.state.sections).filter((e)=>this.state.sections[e].name==section && this.state.sections[e].subject==subject)[0];
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref('questions').orderByChild('section').equalTo(key).once('value').then((data)=>{
            Object.keys(data.val()).forEach((question)=>{
                firebase.database().ref('users').child(uid).child('srs').child(question).set({leitnerbox:0, interval:0});
            })
        })
    }
}