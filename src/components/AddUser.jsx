import { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../redux/actions/userActions";

import { Button, Col } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import ModalComponent from "./ui/ModalComponent";
import NewUserFormComponent from "./ui/NewUserFormComponent";
import toast from "react-hot-toast";

import formatDateTimeBorn from "../util/formatDateTimeBorn";
import formatDateTime from "../util/formatDateTime";

const initialUserData = {
  nama: "",
  alamat: "",
  jenisKelamin: "Pria",
  tanggalLahir: "",
  tanggalInput: "",
};

const AddUser = ({ userData, addUser }) => {
  const [newUser, setnewUser] = useState(initialUserData);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: newUser.nama,
        alamat: newUser.alamat,
        jenisKelamin: newUser.jenisKelamin,
        tanggalLahir: formatDateTimeBorn(newUser.tanggalLahir),
        tanggalInput: formatDateTime(Date.now()),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addUser(data);
        setShowAddModal(false);
        setnewUser(initialUserData);
        toast.success("New user successfully added");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <Col>
        <Button variant="outline-primary" className="pe-none">
          All Users{" "}
          <span className="badge bg-secondary">{userData.length}</span>
        </Button>
      </Col>
      <Col className="text-end">
        <Button variant="primary" onClick={handleAdd}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AiFillPlusCircle size={20} style={{ marginRight: "5px" }} />
            Add user
          </div>
        </Button>
      </Col>

      {showAddModal && (
        <ModalComponent
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          confirmAction={confirmAdd}
          title="Add new user"
          content={
            <NewUserFormComponent newUser={newUser} setnewUser={setnewUser} />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={newUser.nama === "" || newUser.alamat === ""}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
