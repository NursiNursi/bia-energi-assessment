import toast from "react-hot-toast";

import formatDateTimeBorn from "../util/formatDateTimeBorn";
import formatDateTime from "../util/formatDateTime";

export const getAllUsers = (fetchAllUsers, setIsLoading) => {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      fetchAllUsers(data);
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
};

export const confirmDelete = (selectedUser, deleteUser, setShowDeleteModal) => {
  fetch(`http://localhost:3000/users/${selectedUser.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok === true) {
        deleteUser(selectedUser.id);
      }
      setShowDeleteModal(false);
      toast.success("User successfully deleted");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export const confirmUpdate = (selectedUser, setShowEditModal, updateUser) => {
  fetch(`http://localhost:3000/users/${selectedUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: selectedUser.id,
      nama: selectedUser.nama,
      alamat: selectedUser.alamat,
      jenisKelamin: selectedUser.jenisKelamin,
      tanggalLahir: formatDateTimeBorn(selectedUser.tanggalLahir),
      tanggalInput: formatDateTime(Date.now()),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      updateUser(selectedUser.id, data);
      setShowEditModal(false);
      toast.success("User successfully edited");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export const confirmAdd = (
  newUser,
  addUser,
  setShowAddModal,
  setnewUser,
  initialUserData
) => {
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
