import { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../redux/actions/userActions";

import { Button, Col } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";

import ModalComponent from "./ui/ModalComponent";
import NewUserFormComponent from "./ui/NewUserFormComponent";

import { confirmAdd } from "../service/api";

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
          confirmAction={() =>
            confirmAdd(
              newUser,
              addUser,
              setShowAddModal,
              setnewUser,
              initialUserData
            )
          }
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
