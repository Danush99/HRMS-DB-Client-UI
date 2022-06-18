import React, { useEffect, useState } from "react";
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Contact Number",
    accessor: "contact",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Joined Date",
    accessor: "joined_date",
  },
];

export default function SupervisorHomeTable() {
//   const auth = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const setShowToTrue = () => {
    setShow(true);
  };

  const setShowToFalse = () => {
    setShow(false);
  };

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

//   useEffect(() => {
//     axios.defaults.withCredentials = true;
//     axios
//       .get("http://localhost:8087/supplier/all", { withCredentials: true })
//       .then((getSuppliers) => {
//         let data = [];
//         getSuppliers.data.data.forEach((m) => {
//           m.joined_date = dateFormatter(m.joined_date);
//           data.push(m);
//         });
//         setSuppliers(data);
//         setShowToFalse();
//       })
//       .catch((err) => {
//         setAlertMessage("");
//         switch (err.response.request.status) {
//           case 400:
//             setAlertMessage(err.response.data.message);
//             setShowToTrue();
//             break;
//           case 401:
//             auth.logout();
//             auth.setAlert("Session Expired! Login Again");
//             navigate("/");
//             break;
//           case 500:
//             setAlertMessage("Server Error!");
//             setShowToTrue();
//             break;
//           case 501:
//             setAlertMessage("Server Error!");
//             setShowToTrue();
//             break;
//           case 502:
//             setAlertMessage("Server Error!");
//             setShowToTrue();
//             break;
//           default:
//             break;
//         }
//       });
//   }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setModalId] = useState(1);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  function viewModal(Id) {
    setModalIsOpenToTrue();
    if (modalIsOpen === false) {
      setModalId(Id);
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: users,
    },
    useRowSelect,
    useGlobalFilter,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          ...columns,
          {
            id: "edit",
            Cell: ({ row }) => (
              <Button outline color="dark" onClick={() => viewModal(row.id)}>
                Edit
              </Button>
            ),
          },
        ];
      });
    }
  );


  // const deleteRecords = () => {
  //   const url = "http://localhost:8087/supplier/remove";
  //   axios
  //     .post(url, selectedrows)
  //     .then((res) => {
  //       setShowToFalse();
  //       navigate(0);
  //     })
  //     .catch((err) => {
  //       setAlertMessage("");
  //       switch (err.response.request.status) {
  //         case 400:
  //           setAlertMessage(err.response.data.message);
  //           setShowToTrue();
  //           break;
  //         case 401:
  //           // auth.logout();
  //           // auth.setAlert("Session Expired! Login Again");
  //           navigate("/");
  //           break;
  //         case 500:
  //           setAlertMessage("Server Error!");
  //           setShowToTrue();
  //           break;
  //         case 501:
  //           setAlertMessage("Server Error!");
  //           setShowToTrue();
  //           break;
  //         case 502:
  //           setAlertMessage("Server Error!");
  //           setShowToTrue();
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  // };

  return (
    <React.Fragment>
      {/* <Button
        color="secondary"
        outline
        className="shadow-sm"
        // onClick={deleteRecords}
      >
        Delete Supplier
      </Button> */}
      {/* {data = SupplyRecordsTable.selectedrows} */}
      <br></br>
      <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
        <p>{alertMessage}</p>
      </Alert>
      <br></br>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <br></br>
      <div>
        <Table
          responsive
          striped
          bordered
          hover
          className="Mytable table-striped shadow-sm"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal isOpen={modalIsOpen}>
          <ModalHeader
            close={<Button close onClick={setModalIsOpenToFalse}></Button>}
          >
            <h3>Edit User</h3>
          </ModalHeader>
          <ModalBody>
            {/* <EditSupplier row={modalId} suppliers={suppliers} /> */}
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

// {
//     id: 1
//     firstname: 'sfjkks',
//     lastname: 'wrgwrg',
//     birthday: 2022-06-14T18:30:00.000Z,
//     email: 'wrgrwgrwgwrgt',
//     Joined_date: 2022-06-14T18:30:00.000Z,
//     nic_number: '16541371',
//     photo: null,
//     leave_count: 0,
//     name: 'grjbgjk',
//     status: 'contract-fulltime',
//     line1: '8364',
//     line2: 'gjfbgkhgkj',
//     city: 'wgjbkg',
//     district: 'grjhrejkghjkr',
//     postal_code: '1232',
//     type: 'HR Manager',
//     paygrade: 'level 3',
//     phone_number: '1234567890',
//     relationship: 'w,djfbjkwgf'
//   }