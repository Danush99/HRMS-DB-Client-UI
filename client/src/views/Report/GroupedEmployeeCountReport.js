import React, { useState, useEffect } from "react";
import Axios from 'axios';
import  { useLocation } from 'react-router-dom';
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import { Table } from "reactstrap";

const COLUMNS = [
  { Header: "Department", accessor: "Department" },
  { Header: "Employee Type", accessor: "Employee type" },
  { Header: "Employee Status", accessor: "Employee Status" },
  { Header: "Paygrade", accessor: "Paygrade" },
  { Header: "Employee Marital Status", accessor: "Employee Marital Status" },
  { Header: "Employee Count", accessor: "Employee Count" },
];

export function GroupedEmployeesReport() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [parameter, setParameter] = useState("");
  const [employeeCountList, setEmployeeCountList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  const location = useLocation();

  const formValues = location.state.formValues;

  useEffect(() => {
    setParameter(formValues.parameter);
  },[]);

  const user_id = sessionStorage.getItem("userId");
  const current = new Date();
  const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("https://hrms-client-server.onrender.com/report/getCurrentUserName/"+ user_id , { headers:{Authorization : `Bearer ${token}`} })
    .then((currentUser) => {
      setCurrentUsername(currentUser.data.data[0].firstname+" "+currentUser.data.data[0].lastname);
    })
    .catch((err) => {
      setAlertMessage("");
      setAlertType("alert alert-danger");
      switch (err.response.request.status) {
        case 400:          
          setAlertMessage(err.response.data.message);
          setShow (true);
          break;
        case 500:
          setAlertMessage("Server Error!");
          setShow (true);
          break;
        case 501:
          setAlertMessage("Server Error!");
          setShow (true);
          break;
        case 502:
          setAlertMessage("Server Error!");
          setShow (true);
          break;
        default:
          break;
      }
    });
  },[user_id]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.post("https://hrms-client-server.onrender.com/report/create_grouped_employee_report", formValues, { headers:{Authorization : `Bearer ${token}`} })
      .then( (response)=>{
        setEmployeeCountList(response.data.data)
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
  },[formValues]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: COLUMNS,
      data: employeeCountList,
    },
    useRowSelect,
    useGlobalFilter,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          ...columns,
        ];
      });
    }
  );
  
  return (
    <div className="ViewEmployeeCountGroupedByParamaterReport">
      
      <div className="Container-fluid shadow bg-white">
        <h1 class="text-center mt-3 mb-3">Jupiter (Pvt) Limited</h1>
        <h1 class="text-center mx-0 mb-3 p-0">Employee Count Grouped by {formValues.parameter}</h1>
        <h1 class="text-center mx-0 mb-5 p-0">Report</h1>
        
        <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
          {alertMessage}
        </div>

        <div className="row mb-3">
          <div className="col-6">
            Generated by: {currentUsername}
          </div>

          <div className="col-6">
            <div className="text-end">On: {currentDate}</div>
          </div>
        </div>

        <Table
          responsive
          striped
          bordered
          hover
          className="Employee_details_table table-striped shadow-sm"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  if (parameter === column.id || column.id === "Employee Count")
                    return (
                      <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    )
                  else
                    return null
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (parameter === cell.column.id || cell.column.id === "Employee Count"){
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );                        
                    }
                    else
                      return null
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>

      </div>

    </div>
  )
}

export default GroupedEmployeesReport;