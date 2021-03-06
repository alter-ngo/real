import {Input,Form,Radio,Slider,Col,Select,Button } from "antd";
import React from "react";
import StudentsGeneral from 'components/REAL/FormComponents/StudentsGeneral';
import TeachersGeneral from 'components/REAL/FormComponents/TeachersGeneral';
import TutorsGeneral from 'components/REAL/FormComponents/TutorsGeneral';

const { Option } = Select;
class GeneralForm extends React.Component {
  state = {
  };

  render() {

    switch(this.props.status){
      case "Elev":
        return(
          <div className="gx-d-flex justify-content-center">
            <Col span={24}>
              <StudentsGeneral
              nextStep={this.props.nextStep}
              generalVariables={this.props.generalVariables}
              />
            </Col>
          </div>
        )
      case "Tutore":
        return(
          <div className="gx-d-flex justify-content-center">
            <Col span={24}>
              <TutorsGeneral
              nextStep={this.props.nextStep}
              generalVariables={this.props.generalVariablesTutors}/>
            </Col>
          </div>
        )
      case "Profesor":
        return(
          <div className="gx-d-flex justify-content-center">
            <Col span={24}>
              <TeachersGeneral
              nextStep={this.props.nextStep}
              generalVariables={this.props.generalVariablesTutors}/>
            </Col>
          </div>
        )
    }
    
  }
}


export default GeneralForm;
