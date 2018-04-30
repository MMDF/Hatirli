import { Component } from "preact";
import linkState from "linkstate";
import { bind } from "decko";
import './styles/bq.css';
export default class BlankedQuestion extends Component {
    render({question, onChange, answer, currentText, submitanswer}) {
        let split = question.split("*");
        let element = (
            <p>
                {split[0]}
                <div class="answer-input">
                    <div
                        class={(answer != undefined && answer != currentanswer) ? "revealed" : ""}>{answer}</div>
                    <input
                        type="text"
                        label="cevap"
                        onInput={onChange}
                        onKeyDown={(e)=>e.keyCode==13 ? submitanswer() : null}
                        value={currentText}
                    />
                </div>
                {split[1]}
            </p>
        );
        return element;
    }
}