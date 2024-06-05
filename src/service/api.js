import toast from "react-hot-toast";

import formatDateTimeBorn from "../util/formatDateTimeBorn";
import formatDateTime from "../util/formatDateTime";

const API_URL = "http://localhost:3000/users";

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const handleError = (error) => {
  console.error("There was a problem with the fetch operation:", error);
  toast.error("An error occurred. Please try again.");
};

const handleSuccess = (message) => {
  toast.success(message);
};

export const getAllUsers = async (fetchAllUsers, setIsLoading) => {
  try {
    const response = await fetch(API_URL);
    const data = await handleResponse(response);
    fetchAllUsers(data);
    setIsLoading(false);
  } catch (error) {
    handleError(error);
  }
};

export const confirmDelete = async (
  selectedUser,
  deleteUser,
  setShowDeleteModal
) => {
  try {
    const response = await fetch(`${API_URL}/${selectedUser.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await handleResponse(response);
    deleteUser(selectedUser.id);
    setShowDeleteModal(false);
    handleSuccess("User successfully deleted");
  } catch (error) {
    handleError(error);
  }
};

export const confirmUpdate = async (
  selectedUser,
  setShowEditModal,
  updateUser
) => {
  try {
    const response = await fetch(`${API_URL}/${selectedUser.id}`, {
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
    });
    const data = await handleResponse(response);
    updateUser(selectedUser.id, data);
    setShowEditModal(false);
    handleSuccess("User successfully edited");
  } catch (error) {
    handleError(error);
  }
};

export const confirmAdd = async (
  newUser,
  addUser,
  setShowAddModal,
  setnewUser,
  initialUserData
) => {
  try {
    const response = await fetch(API_URL, {
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
    });
    const data = await handleResponse(response);
    addUser(data);
    setShowAddModal(false);
    setnewUser(initialUserData);
    handleSuccess("New user successfully added");
  } catch (error) {
    handleError(error);
  }
};
