import Layout from "@/components/Layout";
import React, { useState } from "react";

function admins() {
  const [email, setEmail] = useState("");
  return (
    <Layout>
      <h1>Admins</h1>
      <h2>Add New Admin</h2>
      <form onSubmit={""}>
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
            <th>Date Created</th>
            <th></th>
          </tr>
        </thead>
        {/* <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody> */}
      </table>
    </Layout>
  );
}

export default admins;
