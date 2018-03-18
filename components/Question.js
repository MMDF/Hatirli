import { Component } from "preact";
import Card from './Card';
import linkState from "linkstate";
import { bind } from "decko";

export default class Question extends Component {
    render(props, state, context) {
        return props.type === "fill"
            ? this.fillBlankQuestion(props, state, context)
            : props.type === "tf" ? this.trueFalseQuestion(props, state) : null;
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.switching === true) {
            return;
        }
        this.setState({ animating: true, switching: true});
        setTimeout(() => { this.setState({ animating: false, switching: false, currentAnswer:null }) }, 400);
    }
    fillBlankQuestion({ kazanim, soru, cevap }, { currentAnswer, switching }) {
        return (
            <div class={switching ? "animate box" : "box"}>
                <Card class={currentAnswer ? "correct" : currentAnswer === false ? "wrong" : null}>
                    <div class="card-content">
                        <span class="card-title">Kazanım {kazanim}</span>
                        {this.createQuestionElement(soru, cevap)}
                    </div>
                </Card>
            </div>
        );
    }
    createQuestionElement(soru, cevap) {
        let split = soru.split("*");
        let element = (
            <p>
                {split[0]}
                <div class="answer-input">
                    <div
                        class={this.state.currentAnswer === false ? "revealed" : ""}>{cevap}</div>
                    <input
                        type="text"
                        label="cevap"
                        onInput={linkState(this, "currentvalue")}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.currentvalue}
                    />
                </div>
                {split[1]}
            </p>
        );
        return element;
    }

    @bind
    handleKeyDown(e) {
        if (e.keyCode === 13) {
            if (this.state.currentvalue === this.props.cevap) {
                this.setState({ currentAnswer: true, currentvalue: "" });
                this.props.correctAnswer();
            } else {
                this.setState({ currentAnswer: false, currentvalue: "" });
                this.props.wrongAnswer();
            }
        }
    }

    trueFalseQuestion({ kazanim, soru, cevap }, { currentAnswer, switching }) {
        return (
            <div>
                <Card class={currentAnswer ? "correct" : currentAnswer === false ? "wrong" : null}>
                    <div class="card-content">
                        <span class="card-title">Kazanım {kazanim}</span>
                        <p>{soru}</p>
                    </div>
                    <div class="card-action">
                        <button>DOĞRU</button>
                        <button>YANLIŞ</button>
                    </div>
                </Card>
            </div>
        );
    }
}
