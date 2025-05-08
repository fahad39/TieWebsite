import ConfirmationPopup from "@/components/ConfirmationPopup";
import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Admins() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [adminList, setAdminList] = useState([]);
  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = () => {
    try {
      axios.get("/api/admin").then((response) => {
        if (response.status === 200) {
          setAdminList(response.data);
        } else {
          toast.error("Unable to get Admin List");
        }
      });
    } catch (error) {
      console.log("get admin:", error);
      toast.error("An Error has occurred");
    }
  };

  const addAdmin = async (e) => {
    try {
      e.preventDefault();
      const data = { email };
      const response = await axios.post("/api/admin", data);

      if (response.status === 200) {
        setEmail("");
        getAdmin();
        toast.success("Admin added successfully!");
      } else {
        toast.error("Unable to add Admin");
      }
    } catch (error) {
      console.log("addAdmin error: ", error);
      toast.error("An Error has occurred");
    }
  };

  const removeAdmin = async (id) => {
    try {
      // console.log("delete:", id);
      const response = await axios.delete("/api/admin?id=" + id);
      // console.log("delete admin:", response);
      if (response.status === 200) {
        toast.success("Admin removed successfully!");
        getAdmin();
      } else {
        toast.error("Unable to remove Admin");
      }
    } catch (error) {
      console.log("delete admin: ", error);
      toast.error("An Error has occurred");
    }
  };

  // Handle delete button click
  const handleDeleteClick = (adminId) => {
    setAdminToDelete(adminId); // Set the admin ID to delete
    setShowPopup(true); // Show the popup
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (adminToDelete) {
      removeAdmin(adminToDelete); // Call the removeAdmin function
    }
    setShowPopup(false); // Close the popup
    setAdminToDelete(null); // Reset the admin ID
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowPopup(false); // Close the popup
    setAdminToDelete(null); // Reset the admin ID
  };

  return (
    <Layout>
      <h1>Admins</h1>
      <h2>Add New Admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex items-baseline">
          <input
            type="text"
            placeholder="Google Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mr-10"
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
      <h2>Existing Admins</h2>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-justify">Email</th>
            <th className="text-justify">Remove</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {adminList.length > 0 &&
            adminList.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.email}</td>
                <td>
                  <button
                    onClick={() => handleDeleteClick(admin._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Render the confirmation popup */}
      {showPopup && (
        <ConfirmationPopup
          message="Are you sure you want to delete this admin?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </Layout>
  );
}

export default Admins;
