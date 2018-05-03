import {Component} from 'preact';
import Question from './pagedraw/questioncomponent.js';
import Page from './pagedraw/studypage.js';
import {bind} from 'decko';
import firebase from './firebase.js';
import linkState from 'linkstate';

class StudyPage extends Component {
    constructor(props) {
        super(props);
        if(!firebase.auth().currentUser) {
            return this.props.history.push('/giris');
        }

        firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('srs').orderByChild('interval').endAt(0).on('value', (data)=>{
            let obj = data.val();
            let review={};   
            let learn={};
            obj && Object.keys(obj).filter(key=>obj[key].leitnerbox!=0).forEach((key)=>review[key]=obj[key]);
            obj && Object.keys(obj).filter(key=>obj[key].leitnerbox==0).forEach((key)=>learn[key]=obj[key]);
            this.setState({ review, learn});
        });
    }
    shouldComponentUpdate(_,nstate) {
        if ((nstate.selected=="learn" && !Object.keys(nstate.learn).length) || (nstate.selected=="review" && !Object.keys(nstate.review).length)) {
            this.setState({selected:null});
        } 
        if (this.state.current!=nstate.current && nstate.current) {
            this.setState({currentQ:null})
            firebase.database().ref('questions').child(nstate.current).once('value', (data)=>this.setState({currentQ:data.val()}));
        }
    }
    render(props, {learn, review, selected, current, currentQ}){
        try {
        return (<div>  
            {!learn | !review ? <div>Yükleniyor...</div>: null}
            {learn && review && !selected ? 
            <Page reviewClick={()=>this.state.review ? this.setState({selected:"review", current:Object.keys(this.state.review)[0]}) : null} 
            learnClick={()=>this.state.learn ? this.setState({selected:"learn", current:Object.keys(this.state.learn)[0]}) : null} 
            learn={Object.keys(learn).length} 
            review={Object.keys(review).length}/>
            : null}
            { selected && !this.state.currentQ ? <div>Yükleniyor...</div>:null}
            { selected && this.state.currentQ ? <Question 
            type={currentQ.type} 
            question={currentQ.type!="tf" ? currentQ.question.split('*') : currentQ.question} 
            onChange={linkState(this,'currentText')}
            submitanswer={this.submitAnswer}
            reveal={this.state.reveal}
            answer={currentQ.answer}
            currentText={this.state.currentText}
            />
            : null}
        </div>);
            } catch(e) {
                console.log(3);
            }
    }
    @bind
	submitAnswer(ans) {
		if(this.state.reveal) {
            if (this.checkAns(ans)) {
                setInterval(this.getNewQuestion, 2000);
            }
			return;
		}
		if (this.checkAns(ans)) {
            this.setState({reveal:true});
            this.correctAnswer()
        } else {
            this.setState({reveal:true});
            this.incorrectAnswer()
        }

    }
    checkAns(ans) {
        if (this.state.currentQ.type=="tf") {
			return ans==this.state.currentQ.answer;
		} else if (this.state.currentQ.type=="fill") {
            return this.state.currentText==this.state.currentQ.answer;
        } else if (this.state.currentQ.type=="multi") {
            return ans==this.state.currentQ.answer;
        }
    }
    @bind
    getNewQuestion() {
        if(this.state[this.state.selected] && Object.keys(this.state[this.state.selected]).length>0){
            this.setState({currentText:"", reveal:false, current:Object.keys(this.state[this.state.selected])[0]})
        } else {
            this.setState({selected:null, current:null, currentQ:null, reveal:false, currentText:""});
        }
    }
	correctAnswer(){
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('srs').child(this.state.current).transaction((srsdata)=>{
            return {leitnerbox:srsdata.leitnerbox+1, interval:Math.floor(2.05**(srsdata.leitnerbox+1)+Math.min(0.15*2.05**(srsdata.leitnerbox+1)*(Math.random()-0.5), 30))}
        })
        setInterval(this.getNewQuestion, 2000);
	}
	incorrectAnswer(){
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('srs').child(this.state.current).transaction((srsdata)=>{
            return {leitnerbox:0, interval:1}
        });
	}
}
export default StudyPage;