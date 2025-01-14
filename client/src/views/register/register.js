import React, { useState,useEffect } from "react";
import Axios from 'axios';
import "./register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { dataJson } from "./data";

export function Register() {

  const navigate = useNavigate();
  const [errmsg, setErr] = useState("");

  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  
  const [formValues, setformValues] = useState(dataJson);
  const [isSubmit, setIsSubmit] = useState(false);

  const [depSelect, setDepSelect] = useState([]);
  const [MsSelect, setMsSelect] = useState([]);
  const [EtSelect, setEtSelect] = useState([]);
  const [PgSelect, setPgSelect] = useState([]);
  const [EsSelect, setEsSelect] = useState([]);

  useEffect( ()=> {
    Axios.get("https://hrms-client-server.onrender.com/getHRMSdetails").then((response)=>{
      //setUserslist(response.data);
      const selectDetails = response.data;
      setDepSelect([...selectDetails[0]]);
      setMsSelect([...selectDetails[1]]);
      setEtSelect([...selectDetails[2]]);
      setPgSelect([...selectDetails[3]]);
      setEsSelect([...selectDetails[4]]);
    });
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]:value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  }
  
  useEffect(() => {
    if (isSubmit) {
      console.log("registering a user");
      let token = sessionStorage.getItem("token");
      Axios.post('https://hrms-client-server.onrender.com/hr/register', formValues, { headers:{Authorization : `Bearer ${token}`}}).then( (response)=>{
          setAlertType("alert alert-success");
          setAlertMessage(response.data.message);
          setShow(true);
          navigate(0);
        })
        .catch((err) => {
          setAlertType("alert alert-danger");
          setAlertMessage("");
          switch (err.response.request.status) {
            case 400:
              setAlertMessage(err.response.data.message);
              setShow(true);
              break;
            case 500:
              setAlertMessage("Server Error!");
              setShow(true);
              break;
            case 501:
              setAlertMessage("Server Error!");
              setShow(true);
              break;
            case 502:
              setAlertMessage("Server Error!");
              setShow(true);
              break;
            default:
              break;
          }
        });
        setIsSubmit(false);
    }
  },[isSubmit,formValues]);

  return (
          <div className="container ">
           
            <div className="Container-fluid background-reg">
              <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                {alertMessage}
              </div>
              <div className="row justify-content-center ">
                <h1 className="text-center mt-3 mb-0">User Registration</h1>

                <form method="post" className="signin-form" onSubmit={handleSubmit}>

                  <div className="error">
                    <p className="text-danger">{errmsg}</p>
                  </div>

                  <div className="row">
                    <div className="form-group mb-3 col-6">
                      <label className="label" >Firstname</label>
                      <input type="text" className="form-control" name="firstname" id="firstname" value={formValues.firstname} onChange={handleChange} required/>
                    </div>

                    <div className="form-group mb-3 col-6">
                    <label className="label" >Lastname</label>
                    <input type="text" className="form-control" name="lastname" id="lastname" value={formValues.lastname} onChange={handleChange} required/>
                    </div>
                  </div>

                  <div className="row">

                    <div className="form-group mb-3 col-4">
                      <label className="label" >Birthday</label>
                      <input type="date" className="form-control"  name="birthday" id="birthday" value={formValues.birthday} onChange={handleChange} required/>
                    </div>
                    <div className="form-group mb-3 col-4">
                      <label className="label" >Salary</label>
                      <input type="text" className="form-control"  name="salary" id="salary" value={formValues.salary} onChange={handleChange} required/>
                    </div>
                    <div className="form-group mb-3 col-4">
                      <label className="label" >Joined_date</label>
                      <input type="date" className="form-control"  name="Joined_date" id="Joined_date" value={formValues.Joined_date} onChange={handleChange} required/>
                    </div>

                  </div>

                  <div className="row">
                    <div className="form-group mb-3 col-6">
                          <label className="label" >Email</label>
                          <input type="email" className="form-control"  name="email" id="email" value={formValues.email} onChange={handleChange} required/>
                      </div>

                    <div className="form-group mb-3 col-6">
                      <label className="label" >nic_number</label>
                      <input type="text" className="form-control"  name="nic_number" id="nic_number" value={formValues.nic_number} onChange={handleChange} required/>
                    </div>
                  </div>

                  <div className="row">
                      <div className="form-group col-6">
                        <label className="label" >phone_number1</label>
                        <input type="text" maxLength="10" className="form-control"  name="phonenumber1" id="phonenumber1" value={formValues.phonenumber1} onChange={handleChange} required/>
                      </div>

                      <div className="form-group col-6">
                        <label className="label" >phone_number2</label>
                        <input type="text" maxLength="10" className="form-control"  name="phonenumber2" id="phonenumber2" value={formValues.phonenumber2} onChange={handleChange} required/>
                      </div>
                  </div>
                  
                  <br/>
                  <div className="row">
                    <div className="form-group mb-3 col-6">
                      <label className="label" >Department</label><br/>
                      <select className="custom-select custom-select-lg mb-3" name="department" id="department" value={formValues.department} onChange={handleChange} >
                        <option >Open this select menu</option>
                        {depSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </div>

                    <div className="form-group mb-3 col-6">
                      <label className="label" >Marital Status </label><br/>
                      <select className="custom-select custom-select-lg mb-3" name="maritalStatus" id="maritalStatus" value={formValues.maritalStatus} onChange={handleChange} >
                        <option >Open this select menu</option>
                        {MsSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-3 col-6">
                      <label className="label" >Employee Type </label><br/>
                      <select className="custom-select custom-select-lg mb-3" name="type" id="type" value={formValues.type} onChange={handleChange} >
                        <option >Open this select menu</option>
                        {EtSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </div>

                    <div className="form-group mb-3 col-6">
                      <label className="label" >Employee status </label><br/>
                      <select className="custom-select custom-select-lg mb-3" name="empStatus" id="empStatus" value={formValues.empStatus} onChange={handleChange} >
                        <option >Open this select menu</option>
                        {EsSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <br/><br/>

                  <h3>Address</h3>


                  <div className="row">
                    <div className="form-group mb-3 col-6">
                      <label className="label" >Line 1</label>
                      <input type="text" className="form-control"  name="Line1" id="Line1" value={formValues.Line1} onChange={handleChange} required/>
                    </div>

                    <div className="form-group mb-3 col-6">
                      <label className="label" >Line 2</label>
                      <input type="text" className="form-control"  name="Line2" id="Line2" value={formValues.Line2} onChange={handleChange} required/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-3 col-4">
                      <label className="label" >city</label>
                      <input type="text" className="form-control"  name="City" id="City" value={formValues.City} onChange={handleChange}/>
                    </div>

                    <div className="form-group mb-3 col-4">
                      <label className="label" >District</label>
                      <input type="text" className="form-control"  name="District" id="District" value={formValues.District} onChange={handleChange} required/>
                    </div>

                    <div className="form-group mb-3 col-4">
                      <label className="label" >Postal code</label>
                      <input type="text" className="form-control"  name="Postal_Code" id="Postal_Code" value={formValues.Postal_Code} onChange={handleChange} required/>
                    </div>
                  </div>

                  <br/><br/>

                  <h3>Emergency Contact Number Details</h3>

                  <div className="form-group mb-3">
                    <label className="label" >Name</label>
                    <input type="text" className="form-control"  name="Name" id="Name" value={formValues.Name} onChange={handleChange} required/>
                  </div>

                  <div className="row">
                    <div className="form-group mb-3 col-6">
                      <label className="label" >Phone Number</label>
                      <input type="text" maxLength="10" className="form-control"  name="phone_number" id="phone_number" value={formValues.phone_number} onChange={handleChange} required/>
                    </div>

                    <div className="form-group mb-3 col-6">
                      <label className="label" >Relation</label>
                      <input type="text" className="form-control"  name="Relationship" id="Relationship" value={formValues.Relationship} onChange={handleChange}  required/>
                    </div>
                  </div>

                  <br/><br/>

                  <h3>Credentials</h3>
                  <div className="form-group mb-3">
                    <label className="label" >username</label>
                    <input type="text" className="form-control"  name="username" id="username" value={formValues.username} onChange={handleChange} required/>
                  </div>

                  <div className="form-group mb-3">
                    <label className="label" >password</label>
                    <input type="password" className="form-control"  name="password1" id="password1" value={formValues.password1} onChange={handleChange} required/>
                  </div>

                  <div className="form-group mb-3">
                    <label className="label" >confimation password</label>
                    <input type="password" className="form-control"  name="password2" id="password2" value={formValues.password2} onChange={handleChange} required/>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-info rounded submit mb-3 px-3" >
                    Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          );
}
