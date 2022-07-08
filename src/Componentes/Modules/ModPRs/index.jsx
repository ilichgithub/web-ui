import React from "react";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { getBranchs } from '../../../Services/branch';
import { getPullRequests, createPullRequest, changeStatusPrs, mergeChangeStatusPrs } from '../../../Services/prs';
import ModalLoading from "../../Modals/ModalLoading";




export default class ModPRs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalLoading: false,
      listBranch:[],
      branchSourceSelect:"-",
      branchDestinySelect:"-",
      prs:[],
      showPrs:false,
      branchSource: "",
      branchDestiny: "",
      author: "",
      title: "",
      description: "",
      status: "OPEN",
      addPrs: false,
      buttonStatus: true
    };
    this.handleGetListPRs = this.handleGetListPRs.bind(this);
    this.handleInputTexto = this.handleInputTexto.bind(this);
    this.handleFormAddPrs = this.handleFormAddPrs.bind(this);
    this.handlePostPR = this.handlePostPR.bind(this);
    this.handleRefreshPR = this.handleRefreshPR.bind(this);
    this.handlePostRefreshPR = this.handlePostRefreshPR.bind(this);
    this.handleGetListBranch = this.handleGetListBranch.bind(this);
    this.handleSelectSource = this.handleSelectSource.bind(this);
    this.handleSelectDestiny = this.handleSelectDestiny.bind(this);
    this.handleValidationCreate = this.handleValidationCreate.bind(this);
    this.handleMerge = this.handleMerge.bind(this);
    
  }

  componentDidMount(){
    this.handleGetListPRs();
    this.handleGetListBranch();
  }

  async handleGetListPRs ()  {    
    try {
      this.setState({modalLoading:true})
      let result = await getPullRequests();
      this.setState({
        prs:result,
        showPrs:true
      });
      this.setState({modalLoading:false})
    } catch (error) {
      this.setState({modalLoading:false})
      alert("Ocurrió un error al solicitar el servicio");
    }

  }

  handleInputTexto(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    this.handleValidationCreate();
  }

  handleFormAddPrs() {
    this.setState({addPrs:!this.state.addPrs})
  }

  async handlePostPR ()  {
    let datos={
      branch_source: this.state.branchSource,
      branch_destiny: this.state.branchDestiny,
      author: this.state.author,
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
    }
    try {
      this.setState({modalLoading:true})
       await createPullRequest(datos);
       this.setState({modalLoading:false})
      this.handleGetListPRs();
    } catch (error) {
      this.setState({modalLoading:false})
      alert("Ocurrió un error al solicitar el servicio");
    }



  }

  handleRefreshPR(id,status) {
    this.handlePostRefreshPR(id,status);
  }

  async handlePostRefreshPR (id,status)  {
    let datos={
      status: status
    }
    
    try {
      this.setState({modalLoading:true})
       await changeStatusPrs(id,datos);
       this.setState({modalLoading:false})
      this.handleGetListPRs();
    } catch (error) {
      this.setState({modalLoading:false})
      alert("Ocurrió un error al solicitar el servicio");
    }

  }
  

  async handleMerge (id,status,origen,destino)  {
    let datos={
      status: status,
      branch_source: origen,
      branch_destiny: destino,
    }
    
    try {
      this.setState({modalLoading:true})
       await mergeChangeStatusPrs(id,datos);
       this.setState({modalLoading:false})
      this.handleGetListPRs();
    } catch (error) {
      this.setState({modalLoading:false})
      alert("Ocurrió un error al solicitar el servicio");
    }

  }

  async handleGetListBranch ()  {

    try {
      this.setState({modalLoading:true})
      let result = await getBranchs();
      console.log(result)
      let branches =[];
      result.branches.forEach(function(branch) {
        if(branch!=="HEAD"){
          branches.push({
            label : branch,
            value: branch,
          })
        }
      })
      this.setState({
        listBranch: branches,
      });
      this.setState({modalLoading:false})
    } catch (error) {
      this.setState({modalLoading:false})
      alert("Ocurrió un error al solicitar el servicio");
    }

  }

  handleSelectSource = selectedOption => {
    this.setState({ branchSourceSelect: selectedOption });
    this.setState({ branchSource: selectedOption.value });
    
    this.handleValidationCreate();
  };

  handleSelectDestiny = selectedOption => {
    this.setState({ branchDestinySelect: selectedOption });
    this.setState({ branchDestiny: selectedOption.value });
    
    this.handleValidationCreate();
  };

  handleValidationCreate = () => {
    if (
      this.state.branchSource !== "" && 
      this.state.branchDestiny !== "" &&
      this.state.author !== "" && 
      this.state.title !== "" && 
      this.state.description !== "" && 
      this.state.status !== ""  && 
      this.state.branchSource !== this.state.branchDestiny
    ) {
      this.setState({buttonStatus:false});
    }else{
      this.setState({buttonStatus:true});}
  };


  render() {

    return (
      <div className="container form-control-sm" id="prs">
        <div className="jumbotron pt-3 pb-4 mb-3 border ">
          <h1 className="display-5 mb-4 text-center">Proyecto GitPython - Modulo PRs</h1>
          <hr className="my-4"></hr>
          <div className="row">
            <div className="col-sm-2">
              <button className="btn btn-primary btn-block" onClick={this.handleFormAddPrs}>Agregar</button>
            </div>
            <div className="col-sm-8">
            </div>
            <div className="col-sm-2">
              <Link className="btn btn-primary btn-block" to="/">
                volver
              </Link>
            </div>
          </div>
          { this.state.addPrs ? <div>
            <br />
            <div className="row">
              <div className="col-sm-4">
                <Select value={this.state.branchSourceSelect} options={this.state.listBranch} name="branchSourceSelect" onChange={this.handleSelectSource} />
              </div>
              <div className="col-sm-4">
                <Select value={this.state.branchDestinySelect} options={this.state.listBranch} name="branchDestinySelect" onChange={this.handleSelectDestiny} />
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  value={this.state.author}
                  name="author"
                  onChange={this.handleInputTexto}
                  className="form-control form-control-sm"
                  placeholder="Autor"
                />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-sm-4">
                <input
                  type="text"
                  value={this.state.title}
                  name="title"
                  onChange={this.handleInputTexto}
                  className="form-control form-control-sm"
                  placeholder="Titulo"
                />
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  value={this.state.description}
                  name="description"
                  onChange={this.handleInputTexto}
                  className="form-control form-control-sm"
                  placeholder="descripcion"
                />
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            <br />
            <br />
            <button className="btn btn-primary btn-block" onClick={this.handlePostPR} disabled={this.state.buttonStatus}>crear</button>    
          </div> : <br /> }
          <br /> 
          { this.state.showPrs ? 
          <div className="table-responsive" style={{ height: "auto" }}>
            <table className="table table-sm table-hover table-bordered mb-1 mt-2 text-center">
              <thead>
                <tr className="thead-light">
                  <th scope="col">Origen</th>
                  <th scope="col">Destino</th>
                  <th scope="col">Autor</th>
                  <th scope="col">titulo</th>
                  <th scope="col">observacion</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Cerrar</th>
                  <th scope="col">Combinar</th>
                </tr>
              </thead>
              <tbody>
                { this.state.prs.map( pr =>
                  <tr className="table-success" id={pr.id}>
                    <td className="text-nowrap  align-middle">{pr.branch_source}</td>
                    <td className="text-nowrap  align-middle">{pr.branch_destiny}</td>
                    <td className="text-nowrap  align-middle">{pr.author}</td>
                    <td className="text-nowrap  align-middle">{pr.title}</td>
                    <td className="text-nowrap  align-middle">{pr.description}</td>
                    <td className="text-nowrap  align-middle">{pr.status}</td>
                    <td className="text-nowrap  align-middle">{pr.status === "OPEN" ? <button className="btn btn-secondary btn-block" value={pr.id} onClick={e => this.handleRefreshPR(e.target.value,"CLOSED")}  disabled={pr.status!=="OPEN"}>Cerrar</button> : <button className="btn btn-info btn-block"  value={pr.id} onClick={e => this.handleRefreshPR(e.target.value,"OPEN")} disabled={pr.status!=="CLOSED"} >Abrir</button> }</td>
                    <td className="text-nowrap  align-middle"><button className="btn btn-success btn-block" value={pr.id} disabled={pr.status!=="OPEN"} onClick={e => this.handleMerge(e.target.value,"MERGE",pr.branch_source,pr.branch_destiny)}>Combinar</button></td>
                  </tr>)
                }
              </tbody>
            </table>
          </div> : 
          <br />
          }
          <ModalLoading modalListarLoading={this.state.modalLoading} />

        </div>
      </div>
    );
  }
}
