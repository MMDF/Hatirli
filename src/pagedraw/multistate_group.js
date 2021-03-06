// Generated by https://pagedraw.io/pages/9870
import BlankedQuestion from '../BlankedQuestion.jsx';
import Multibutton from './multibutton';
import Tfbutton from './tfbutton';
import React from 'react';
import './multistate_group.css';

function render() {
    return <div className="multistate_group">
        { (this.props.state === "multi") ?
            <div className="multistate_group-multi-3">
                <div className="multistate_group-0-0-0">
                    <div className="multistate_group-0-0-0-0" /> 
                    <div className="multistate_group-rectangle-0">
                        <div className="multistate_group-0-0-0-1-0">
                            <div className="multistate_group-0-0-0-1-0-0" /> 
                            <div className="multistate_group-lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_aenean_lacinia_mauris_ac_orci_ultrices_efficitur_aliquam_ipsum_neque_convallis_et_venenatis_aliquet_tempus_eget-6">
                                { this.props.question[0] }
                            </div>
                            <div className="multistate_group-0-0-0-1-0-2" /> 
                        </div>
                        <div className="multistate_group-0-0-0-1-1">
                            <div onClick={this.props.submitanswer.bind(null,1)} className="multistate_group-multibutton-8">
                                <Multibutton state={(this.props.reveal ? (this.props.answer==1 ? "correct" : "wrong") : "default")} text={(this.props.question[1])} /> 
                            </div>
                            <div onClick={this.props.submitanswer.bind(null,2)} className="multistate_group-multibutton-3">
                                <Multibutton state={(this.props.reveal ? (this.props.answer==2 ? "correct" : "wrong") : "default")} text={(this.props.question[2])} /> 
                            </div>
                        </div>
                        <div className="multistate_group-0-0-0-1-2">
                            <div onClick={this.props.submitanswer.bind(null,3)} className="multistate_group-multibutton-6">
                                <Multibutton state={(this.props.reveal ? (this.props.answer==3 ? "correct" : "wrong") : "default")} text={(this.props.question[3])} /> 
                            </div>
                            <div onClick={this.props.submitanswer.bind(null,4)} className="multistate_group-multibutton-38">
                                <Multibutton state={(this.props.reveal ? (this.props.answer==4 ? "correct" : "wrong") : "default")} text={(this.props.question[4])} /> 
                            </div>
                        </div>
                    </div>
                    <div className="multistate_group-0-0-0-2" /> 
                </div>
            </div>
        : null}
        { (this.props.state === "fill") ?
            <div className="multistate_group-fill-7">
                <div className="multistate_group-1-0-0">
                    <div className="multistate_group-1-0-0-0" /> 
                    <div className="multistate_group-rectangle-1">
                        <div className="multistate_group-1-0-0-1-0">
                            <div className="multistate_group-lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_aenean_lacinia_mauris_ac_orci_ultrices_efficitur_aliquam_ipsum_neque_convallis_et_venenatis_aliquet_tempus_eget-5">
                                <BlankedQuestion question={this.props.question} onChange={this.props.onChange} reveal={this.props.reveal} answer={this.props.answer} currentText={this.props.currentText} submitanswer={this.props.submitanswer}/>
                            </div>
                        </div>
                    </div>
                    <div className="multistate_group-1-0-0-2" /> 
                </div>
            </div>
        : null}
        { (this.props.state === "tf") ?
            <div className="multistate_group-tf-7">
                <div className="multistate_group-2-0-0">
                    <div className="multistate_group-2-0-0-0" /> 
                    <div className="multistate_group-rectangle-00">
                        <div className="multistate_group-2-0-0-1-0">
                            <div className="multistate_group-lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_aenean_lacinia_mauris_ac_orci_ultrices_efficitur_aliquam_ipsum_neque_convallis_et_venenatis_aliquet_tempus_eget-0">
                                { this.props.question }
                            </div>
                        </div>
                        <div className="multistate_group-2-0-0-1-1">
                            <div onClick={()=>this.props.submitanswer(true)} className="multistate_group-multistate_group_2">
                                <Tfbutton state={(this.props.reveal ? (this.props.answer==true ? "correct" : "wrong") : "default")} text={"DOĞRU"} /> 
                            </div>
                            <div onClick={()=>this.props.submitanswer(false)} className="multistate_group-multistate_group_2_">
                                <Tfbutton state={(this.props.reveal ? (this.props.answer==true ? "wrong" : "correct") : "default")} text={"YANLIŞ"} /> 
                            </div>
                        </div>
                    </div>
                    <div className="multistate_group-2-0-0-2" /> 
                </div>
            </div>
        : null}
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}