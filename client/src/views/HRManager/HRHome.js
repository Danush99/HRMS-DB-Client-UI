import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import "./HRHome.css";
import React, { Component } from "react";
import HRHomeTable from "./HRHomeTable";
import NavbarComponent from "../../navbar/navbar";
import { Link } from "react-router-dom";

class HRHome extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.state = {
      isModalOpen: false,
      check: false,
      selectAll: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleSelectAll() {
    this.setState({
      selectAll: !this.state.selectAll,
    });
  }


  render() {

    return (
      <React.Fragment>
        <NavbarComponent/>
        <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-0">HR Manager Home</h1>
          <br></br>
          <Button outline color="dark" className="shadow-sm">
            Add New User
          </Button>

          <HRHomeTable/>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>
            {/* <ViewRequest /> */}   //TODO
          </ModalBody>
        </Modal>

        <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>
      </React.Fragment>
    );
  }
}

export default HRHome;