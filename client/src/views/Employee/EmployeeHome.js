import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import "./EmployeeHome.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";


class EmployeeHome extends Component {
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
        <div className="Container-fluid ">
          <h1 class="text-center mt-3 mb-0">Employee Home</h1>
          <br></br>
            <div className='row'>
              <div className="col-6">
              <img
                    alt=""
                    src="assets/images/vec1.png"
                    // width="100"
                    // height="100"
                    className="d-inline-block align-top"
                    />{' '}
              </div>
              <div className="col-3">
                <Link to={'/user/apply_leave'}>
                  <Button 
                  outline color="dark" 
                  className="shadow-sm col-6"
                  >
                      Apply Leave
                  </Button>
                </Link>
              </div>
              <div className="col-3"></div>
                <br></br>
                <br></br>
                <div className="col-3">
                <Link to={'/user/view_profile'}>
                  <Button outline color="dark" className="shadow-sm col-6">
                      Edit Profile
                  </Button>
                </Link>
                  <br></br>
                  <br></br>
                </div>
            </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>
            {/* <ViewRequest /> */}
          </ModalBody>
        </Modal>
   </React.Fragment>
    );
  }
}

export default EmployeeHome;