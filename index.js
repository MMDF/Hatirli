import "./style/index.scss";
import "./materialize-src/sass/materialize.scss"
import { Component, render } from "preact";
import Question from "./components/Question.js";
import firebase from './firebase.js';
import 'preact/devtools';
import {BrowserRouter} from 'react-router-dom';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.setState({ kazanim: 22, soru: "Eve *", cevap: "gideceğim" })
	}
	render(props, { kazanim, soru, cevap }) {
		return (<div>
			<div class="question-container">
				<Question
					correctAnswer={() => { this.setState({ kazanim: 10, soru: "Lütfen * cevap ver", cevap: "doğru" }) }}
					kazanim={kazanim}
					soru={soru}
					cevap={cevap}
					type="fill" />
			</div>
			<div class="row">
				<form class="col s12">
					<div class="row">
						<div class="input-field col s12">
							<input type="text" id="kazanim" placeholder="Kazanım" class="validate" />
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<input id="soru" type="text" placeholder="Soru" class="validate" />
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<input id="cevap" type="text" placeholder="Cevap" class="validate" />
						</div>
					</div>
				</form>
			</div>
		</div>
		);
	}
}
