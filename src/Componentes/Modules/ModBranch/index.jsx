import React from "react";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { getBranchs, getCommitsfromBranch } from '../../../Services/branch';
import ModalLoading from "../../Modals/ModalLoading";

export default class ModBranch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalLoading: false,
      listBranch:[],
      commits:[],
      showCommits:false,
      branchSelect:"-"
    };
    this.handleGetListBranch = this.handleGetListBranch.bind(this);
    this.handleGetListCommits = this.handleGetListCommits.bind(this);
    
  }

  componentDidMount(){
    this.handleGetListBranch();
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


  handleChange = selectedOption => {
    console.log(selectedOption);
    this.setState({ branchSelect:selectedOption });
    this.handleGetListCommits(selectedOption.value);
  };
  

  async handleGetListCommits (branch)  {
    
    try {
      this.setState({modalLoading:true})
      this.setState({commits:[],showCommits:false})
      let result = await getCommitsfromBranch(branch);
      this.setState({
        commits:result,
        showCommits:true
      });
      this.setState({modalLoading:false})
    }catch (error) {
      this.setState({modalLoading:false})
      alert("Ocurrió un error al solicitar el servicio");
    }
  }

  render() {

    return (
      <div className="container form-control-sm" id="branch">
        <div className="jumbotron pt-3 pb-4 mb-3 border ">
          <h1 className="display-5 mb-4 text-center">Proyecto GitPython - Modulo Branch</h1>
          <hr className="my-4"></hr>
          <div className="row">
            <div className="col-sm-10">
            </div>
            <div className="col-sm-2">
              <Link className="btn btn-primary btn-block" to="/">
                volver
              </Link>
            </div>
          </div>
          <br />
          <br />
          <Select value={this.state.branchSelect} options={this.state.listBranch} onChange={this.handleChange} />
          <br />
          <br />
          { this.state.showCommits ? 
          <div className="table-responsive" style={{ height: "auto" }}>
            <table className="table table-sm table-hover table-bordered mb-1 mt-2 text-center">
              <thead>
                <tr className="thead-light">
                  <th scope="col">Fecha</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mensaje</th>
                  <th scope="col">Nro Archivos</th>
                </tr>
              </thead>
              <tbody>
                { this.state.commits.map( commit =>
                  <tr className="table-success">
                    <td className="text-nowrap  align-middle">{commit.date}</td>
                    <td className="text-nowrap  align-middle">{commit.name}</td>
                    <td className="text-nowrap  align-middle">{commit.email}</td>
                    <td className="text-nowrap  align-middle">{commit.msg}</td>
                    <td className="text-nowrap  align-middle">{commit.files}</td>
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
