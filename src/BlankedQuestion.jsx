import { Component } from "preact";
import linkState from "linkstate";
import { bind } from "decko";
import './styles/bq.scss';
export default class BlankedQuestion extends Component {
    componentWillReceiveProps(nextprops) {
        if (this.props.question!=nextprops.question) {
            this.setState({correctsubmit:undefined});
        }
    }
    render({question, onChange, answer, currentText, submitanswer, reveal},{correctsubmit}) {
        let split = question;
        let element = (
            <p>
                {split[0]}
                <div class={"answer-input"+(currentText==answer && correctsubmit? " correct":"")}>
                    <div
                        class={(reveal && !correctsubmit) ? "revealed" : ""}>{answer}</div>
                    <input
                        type="text"
                        label="cevap"
                        onInput={onChange}
                        onKeyDown={(e)=>e.keyCode==13 ? this.setState({correctsubmit:this.props.currentText==this.props.answer}) || submitanswer() : null}
                        value={correctsubmit  ? answer : currentText}
                    />
                </div>
                {split[1]}
            </p>
        );
        return element;
    }
}