import { Component, render } from "preact";
import firebase from './firebase.js';
import 'preact/devtools';
import {BrowserRouter} from 'react-router-dom';
import QuestionComponent from './src/pagedraw/QuestionComponent.jsx';
import linkState from 'linkstate';
import { bind } from 'decko';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.setState({ })
	}
	render(props, { question, type, answer, currentanswer }) {
		return (<div>
			<QuestionComponent question={question} onChange={linkState(this,"currentanswer")} currentanswer={currentanswer} submitanswer={this.submitAnswer} answer={answer} type={type} />
		</div>
		);
	}
	@bind
	submitAnswer(ans) {
		if(this.state.answer!=undefined) {
			return;
		}
		if (this.state.type=="tf") {
			if (ans==this.state.questionAnswer) {
				this.setState({answer:this.state.questionAnswer});
				this.correctAnswer();
			}else {

				this.setState({answer:this.state.questionAnswer});
				this.incorrectAnswer();
			}
		} else if (this.state.type=="fill") {
			if (this.state.currentanswer==this.state.questionAnswer) {
				this.setState({answer:this.state.questionAnswer});
				this.correctAnswer();
			}else {

				this.setState({answer:this.state.questionAnswer});
				this.incorrectAnswer();
			}
		}
	}
	correctAnswer(){
		
	}
	incorrectAnswer(){

	}
}
