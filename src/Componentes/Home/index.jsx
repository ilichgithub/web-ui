import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="container form-control-sm" id="Home">
        <div className="jumbotron pt-3 pb-4 mb-3 border ">
          <h1 className="display-5 mb-4 text-center">Proyecto GitPython</h1>
          <hr className="my-4"></hr>
          <div className="row">
            <div className="col">
              <Link className="btn btn-primary btn-block" to="/Branches">
                Ramas
              </Link>
            </div>
            <div className="col">
              <Link
                className="btn btn-primary btn-block"
                to="/PullRequests"
              >
                PRs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
