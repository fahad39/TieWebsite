import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState, useEffect } from "react";

function admins() {
  const [email, setEmail] = useState("");
  const [adminList, setAdminList] = useState([]);
  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = () => {
    axios.get("/api/admin").then((response) => {
      // console.log(response.data);
      setAdminList(response.data);
    });
  };

  const addAdmin = async (e) => {
    try {
      e.preventDefault();
      // console.log("inside addAdmin: ", email);
      const data = { email };
      const response = await axios.post("/api/admin", data);
      // console.log("success", response);
      setEmail("");
    } catch (error) {
      console.log("addAdmin: ", error);
    }
  };

  const removeAdmin = async (id) => {
    try {
      const response = await axios.delete("/api/admins?id=" + id);
      getAdmin();
    } catch (error) {
      console.log("addAdmin: ", error);
    }
  };

  return (
    <Layout>
      <h1>Admins</h1>
      <h2>Add New Admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex items-center">
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
            <th>Email</th>
            <th>Remove</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {adminList.length > 0 &&
            adminList.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.email}</td>
                <td onClick={removeAdmin()}>Delete</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default admins;
