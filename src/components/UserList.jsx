import { useEffect, useState } from "react";
import {
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../redux/actions/userActions";
import { connect } from "react-redux";

import {
  Button,
  Col,
  Container,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";

import AddUser from "./AddUser";
import ModalComponent from "./ui/ModalComponent";
import FormComponent from "./ui/FormComponent";
import DetailComponent from "./ui/DetailComponent";

import { confirmDelete, confirmUpdate, getAllUsers } from "../service/api";

function UserList({ userData, fetchAllUsers, deleteUser, updateUser }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUsers(fetchAllUsers, setIsLoading);
  }, [fetchAllUsers]);

  const handleView = (userInfo) => {
    setShowViewModal(true);
    setSelectedUser(userInfo);
  };

  const handleEdit = (userInfo) => {
    console.log(userInfo);
    setShowEditModal(true);
    setSelectedUser(userInfo);
  };

  const handleDelete = (userInfo) => {
    setShowDeleteModal(true);
    setSelectedUser(userInfo);
  };

  return (
    <>
      <Container>
        <Row className="py-5 mt-5">
          <AddUser />
        </Row>
        <Row>
          <Col>
            <Table hover responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>Tanggal Input</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {userData?.map((ele, index) => (
                  <tr key={ele.id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{ele.nama}</td>
                    <td>{ele.alamat}</td>
                    <td>{ele.jenisKelamin}</td>
                    <td>{ele.tanggalLahir}</td>
                    <td>{ele.tanggalInput}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <div>
                          <Button onClick={() => handleView(ele)}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiOutlineEye
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              View
                            </div>
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleEdit(ele)}
                            variant="outline-primary"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiFillEdit
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              Edit
                            </div>
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleDelete(ele)}
                            variant="outline-danger"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiFillDelete
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              Delete
                            </div>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {isLoading && (
              <Placeholder animation="glow">
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
              </Placeholder>
            )}
          </Col>
        </Row>
      </Container>

      {showViewModal && (
        <ModalComponent
          showModal={showViewModal}
          setShowModal={setShowViewModal}
          title="User Detail"
          confirmButtonText="OK"
          cancelButtonText="Cancel"
          content={
            <DetailComponent
              selecteduser={selectedUser}
              setselecteduser={setSelectedUser}
            />
          }
          showButton={false}
        />
      )}

      {showEditModal && (
        <ModalComponent
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          confirmAction={() =>
            confirmUpdate(selectedUser, setShowEditModal, updateUser)
          }
          title="Edit User"
          content={
            <FormComponent
              selecteduser={selectedUser}
              setselecteduser={setSelectedUser}
            />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={
            selectedUser.name === "" || selectedUser.alamat === ""
          }
        />
      )}

      {showDeleteModal && (
        <ModalComponent
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmAction={() =>
            confirmDelete(selectedUser, deleteUser, setShowDeleteModal)
          }
          title="Delete User"
          content="Are you sure you want to delete this user ?"
          confirmButtonText="Confirm"
          cancelButtonText="Cancel"
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (data) => dispatch(fetchAllUsers(data)),
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
