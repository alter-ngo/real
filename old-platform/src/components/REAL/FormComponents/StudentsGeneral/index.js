import { InputNumber, Form, Radio, Select, Button } from "antd";
import React from "react";
import Widget from "components/Widget";
import Data from "components/REAL/FormComponents/data";
const { Option } = Select;
var json = Data;
const judete_array=["MUNICIPIUL BUCURE\u015eTI","ALBA","ARAD","ARGE\u015e","BAC\u0102U","BIHOR","BISTRI\u0162A-N\u0102S\u0102UD","BOTO\u015eANI","BR\u0102ILA","BRA\u015eOV","BUZ\u0102U","C\u0102L\u0102RA\u015eI","CARA\u015e-SEVERIN","CLUJ","CONSTAN\u0162A","COVASNA","D\u00c2MBOVI\u0162A","DOLJ","GALA\u0162I","GIURGIU","GORJ","HARGHITA","HUNEDOARA","IALOMI\u0162A","IA\u015eI","ILFOV","MARAMURE\u015e","MEHEDIN\u0162I","MURE\u015e","NEAM\u0162","OLT","PRAHOVA","S\u0102LAJ","SATU MARE","SIBIU","SUCEAVA","TELEORMAN","TIMI\u015e","TULCEA","VASLUI","V\u00c2LCEA","VRANCEA"]
let localitati = [], licee = [], specializari=[], filiere=[],profile=[];
let path=json["ALBA"],second_path,third_path,fourth_path,fifth_path;
class GeneralForm extends React.Component {
  constructor(props){
    super(props);  
  this.state = {
    valid: [],
    question:[],
  };
  this.validate=this.validate.bind(this);
  this.validateForm=this.validateForm.bind(this);
  this.saveCurrentState=this.saveCurrentState.bind(this);
  }
  componentWillMount(){
    let auxv=[],auxq=[];
    for(let i=0;i<=9;i++){
      auxq.push(
        {value:""}
      );
      auxv.push({status:"",txt:""});
    }
    this.setState({valid:auxv,question:auxq});
  }
  saveCurrentState(){
    const {generalVariables}= this.props;
    const {question} = this.state;
    for(let i=0;i<=9;i++){
      generalVariables[i].value=question[i].value;
    }
    this.props.nextStep();
  }
    componentWillMount(){
      let auxv=[],auxq=[];
      for(let i=0;i<=9;i++){
        auxq.push(
          {value:""}
        );
        auxv.push({status:"",txt:""});
      }
      this.setState({valid:auxv,question:auxq});
    }
    saveCurrentState(){
      const {generalVariables} = this.props;
      const {question} = this.state;
      for(let i=0;i<=9;i++){
        generalVariables[i].value=question[i].value;
      }
      this.props.nextStep();
    }
    componentDidMount(){
      const {generalVariables}= this.props;
      let aux=this.state.question;
      for(let i=0;i<=9;i++){
        aux[i].value=generalVariables[i].value;
      }
      this.setState({question:aux});
    }
    validate(input){
      let aux = this.state.valid;
      if(this.state.question[input].value=""){
        aux[input].status="error";
        aux[input].txt="*Acest c??mp este obligatoriu.";
       
      }
      else{
        aux[input].status="success"; 
        aux[input].txt="";
      }
      this.setState({valid:aux});
      
    }
    handleChange(value,input){
      this.validate(input);
      let aux = this.state.question;
      aux[input].value = value;
      if(input===3){
        let loc=json[path][second_path].judet;
        aux[input].value= loc;}
      if(input===4){
        let loc=json[path][second_path].judet;
        let lic=json[path][second_path][loc][third_path].liceu;
        aux[input].value= lic;}  
      if(input===7){
        if(fourth_path===0)
        aux[input].value= "Teoretica";
        else
        aux[input].value= "Tehnologica";}
      if(input===8){
        let loc=json[path][second_path].judet;
        let lic=json[path][second_path][loc][third_path].liceu;
        let prof=json[path][second_path][loc][third_path][lic][fourth_path][fifth_path].profile;
        aux[input].value= prof}
      if(input===9){
        let loc=json[path][second_path].judet;
        let lic=json[path][second_path][loc][third_path].liceu;
        let prof=json[path][second_path][loc][third_path][lic][fourth_path][fifth_path].profile;
        aux[input].value= json[path][second_path][loc][third_path][lic][fourth_path][fifth_path][prof][value];}
      this.setState({
        question: aux,
      });
   };
   handleChangeNested(value,input){
    if(input===2){
      let aux_q = this.state.question;
      aux_q[3].value = "";
      aux_q[4].value = "";
      aux_q[7].value = "";
      aux_q[8].value = "";
      aux_q[9].value = "";
      this.setState({
        question: aux_q,
      });
      path=value;
      localitati=[];licee=[];profile=[]; specializari=[];filiere = [];
      for(var i in json[value]){
      localitati.push(
      <Select.Option key={i}>
        {json[value][i].judet}
      </Select.Option>
    )}
    }
    if(input===3){
      let aux_q = this.state.question;
      aux_q[4].value = "";
      aux_q[7].value = "";
      aux_q[8].value = "";
      aux_q[9].value = "";
      this.setState({
        question: aux_q,
      });
      licee=[];profile=[]; specializari=[];filiere = [];
      second_path=value;
      let aux=json[path][value].judet
      let inx=0;
      for(var i in json[path][value][aux]){
      licee.push(
        <Select.Option key={inx}>
          {json[path][value][aux][i].liceu}
        </Select.Option>
      );inx+=1;}
    }
    if(input===4){
      let aux_q = this.state.question;
      aux_q[7].value = "";
      aux_q[8].value = "";
      aux_q[9].value = "";
      this.setState({
        question: aux_q,
      });
      filiere = [];profile=[]; specializari=[];third_path=value;
      let aux=json[path][second_path].judet;
      let aux2=json[path][second_path][aux][third_path].liceu;
      if(Array.isArray(json[path][second_path][aux][third_path][aux2][0]) && json[path][second_path][aux][third_path][aux2][0].length){
        filiere.push(<Select.Option key={0}>
        {"Teoretica"}
        </Select.Option>)
      }
      if(Array.isArray(json[path][second_path][aux][third_path][aux2][1]) && json[path][second_path][aux][third_path][aux2][1].length){
        filiere.push(<Select.Option key={1}>
        {"Tehnologica"}
        </Select.Option>)
      }
    }
    if(input===7){
      let aux_q = this.state.question;
      aux_q[8].value = "";
      aux_q[9].value = "";
      this.setState({
        question: aux_q,
      });
      profile=[]; specializari=[];
      fourth_path=value;
      let aux=json[path][second_path].judet;
      let aux2=json[path][second_path][aux][third_path].liceu;
      if(Array.isArray(json[path][second_path][aux][third_path][aux2][fourth_path]) && json[path][second_path][aux][third_path][aux2][fourth_path].length){
        for(var i in json[path][second_path][aux][third_path][aux2][fourth_path]){
          profile.push(<Select.Option key={i}>
            {json[path][second_path][aux][third_path][aux2][fourth_path][i].profile}
            </Select.Option>)
        }
      }
    }
    if(input===8){
      let aux_q = this.state.question;
      aux_q[9].value = "";
      this.setState({
        question: aux_q,
      });
        specializari=[];
        fifth_path=value;
        let aux=json[path][second_path].judet;
        let aux2=json[path][second_path][aux][third_path].liceu;
        let aux3=json[path][second_path][aux][third_path][aux2][fourth_path][fifth_path].profile
        if(Array.isArray(json[path][second_path][aux][third_path][aux2][fourth_path]) && json[path][second_path][aux][third_path][aux2][fourth_path].length){
          for(var i in json[path][second_path][aux][third_path][aux2][fourth_path][fifth_path][aux3]){
            specializari.push(<Select.Option key={i}>
              {json[path][second_path][aux][third_path][aux2][fourth_path][fifth_path][aux3][i]}
              </Select.Option>)
          }
        }
    }
    this.handleChange(value,input);
   }
   validateForm(){
    const {question}=this.state;
    let ok=true;
    let aux=this.state.valid;
     for(let i=0;i<=9;i++){
       if(question[i].value==""){
         aux[i].status="error";
         aux[i].txt="*Acest c??mp este obligatoriu.";
         ok=false;
       }
     }
     this.setState({valid:aux});
     if(ok){
       this.saveCurrentState();
     }
   }
   handleChangeRadio = input => e => {
    this.validate(input);
    let aux = this.state.question;
    aux[input].value = e.target.value;
    this.setState({
      question: aux,
    });
  }
  render() {
    const {question,valid}=this.state;
    let judete = [], litere = [];
    for (let i = 0; i <= 41; i++) {
      litere.push(
        <Select.Option key= {i}>
          {i}
        </Select.Option>
      )
      judete.push(
        <Select.Option key= {judete_array[i]}>
          {judete_array[i]}
        </Select.Option>
      )}
    return (
    <Widget>
      <Form layout={"vertical"} >

        <Form.Item validateStatus={valid[0].status} help={valid[0].txt} label={<p style={{fontSize:18,fontWeight:400}}> Ce v??rst?? ai?</p>}>
          <InputNumber min={11} max={25} value={question[0].value} onChange={(value)=>{this.handleChange(value, 0)}}/>
        </Form.Item>
        <Form.Item validateStatus={valid[1].status} help={valid[1].txt} label=" Gen">
          <Select style={{ width: 240 }} placeholder="Selecteaz??" value={question[1].value || undefined}  onChange={(value)=>{this.handleChange(value, 1)}}>
            <Option value="male">Masculin</Option>
            <Option value="female">Feminin</Option>
            <Option value="unspecfied">Nu doresc s?? men??ionez</Option>
          </Select>
        </Form.Item>
        <Form.Item validateStatus={valid[2].status} help={valid[2].txt} label={<p style={{fontSize:18,fontWeight:400}}> ??n ce jude?? ??nve??i?</p>}>
          <Select
            showSearch
            style={{ width: 240 }}
            onChange={(value)=>{this.handleChangeNested(value, 2)}}
            value={question[2].value || undefined}
            placeholder="Selecteaz?? jude??ul"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {judete}
          </Select>
        </Form.Item>
        <Form.Item validateStatus={valid[3].status} help={valid[3].txt} label={<p style={{fontSize:18,fontWeight:400}}> ??n ce localitate ??nve??i?</p>}>
          <Select
            showSearch
            style={{ width: 240 }}
            placeholder="Selecteaz?? localitatea"            
            optionFilterProp="children"
            value={question[3].value || undefined}
            disabled={(valid[2].status==="success")?false:true}
            onChange={(value)=>{this.handleChangeNested(value , 3)}}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {localitati}
          </Select>
        </Form.Item>
        <Form.Item validateStatus={valid[4].status} help={valid[4].txt} label={<p style={{fontSize:18,fontWeight:400}}> La ce liceu ??nve??i?</p>}>
          <Select
            showSearch
            style={{ width: 240 }}
            placeholder="Selecteaz?? liceul"
            value={question[4].value || undefined}
            disabled={(valid[3].status==="success")?false:true}
            optionFilterProp="children"
            onChange={(value)=>{this.handleChangeNested(value, 4)}}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {licee}
          </Select>
        </Form.Item>
        <Form.Item validateStatus={valid[5].status} help={valid[5].txt} label={<p style={{fontSize:18,fontWeight:400}}> Ce clas?? e??ti?</p>}>
          <Radio.Group buttonStyle="solid" value={question[5].value || undefined} onChange={this.handleChangeRadio(5)}>
            <Radio.Button value={"IX"}>a IX-a</Radio.Button>
            <Radio.Button value={"X"}>a X-a</Radio.Button>
            <Radio.Button value={"XI"}>a XI-a</Radio.Button>
            <Radio.Button value={"XII"}>a XII-a</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item validateStatus={valid[6].status} help={valid[6].txt} label={<p style={{fontSize:18,fontWeight:400}}> La ce liter?? e??ti?</p>}>
          <Select
            showSearch
            style={{ width: 240 }}
            placeholder="Selecteaz?? litera"
            value={question[6].value || undefined}
            onChange={(value)=>{this.handleChange(value, 6)}}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {litere}
          </Select>
        </Form.Item>
        <Form.Item validateStatus={valid[7].status} help={valid[7].txt} label={<p style={{fontSize:18,fontWeight:400}}> La ce filier?? ??nve??i?</p>}>
          <Select
            showSearch
            style={{ width: 240 }}
            placeholder="Selecteaz?? filiera"
            value={question[7].value || undefined}
            disabled={(valid[4].status==="success")?false:true}
            onChange={(value)=>{this.handleChangeNested(value, 7)}}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {filiere}
          </Select>
        </Form.Item>
        <Form.Item validateStatus={valid[8].status} help={valid[8].txt} label={<p style={{fontSize:18,fontWeight:400}}> La ce profil ??nve??i?</p>}>
          <Select
            showSearch
            style={{ width: 240 }}
            onChange={(value)=>{this.handleChangeNested(value, 8)}}
            placeholder="Selecteaz?? profilul"
            value={question[8].value || undefined}
            disabled={(valid[7].status==="success")?false:true}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {profile}
          </Select>
        </Form.Item>
        <Form.Item validateStatus={valid[9].status} help={valid[9].txt} label={<p style={{fontSize:18,fontWeight:400}}> La ce specializare ??nve??i?</p>}>
          <Select
            showSearch
            style={{ width: 240 }}
            placeholder="Selecteaz?? specializarea"
            optionFilterProp="children"
            value={question[9].value || undefined}
            disabled={(valid[8].status==="success")?false:true}
            onChange={(value)=>{this.handleChange(value, 9)}}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {specializari}
          </Select>
        </Form.Item>

      </Form>
        <br/>
        <Button type="primary" style={{marginLeft:8}} onClick={()=>this.validateForm()}>Next</Button>
      </Widget>
    );
  }
}

export default GeneralForm;
