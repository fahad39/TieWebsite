import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Center from "@/components/Center";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

const AccountPageStyled = styled.div`
  .account-details {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .orders {
    margin-top: 20px;
  }

  .order {
    margin-bottom: 15px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
  }

  .order h4 {
    margin: 0 0 10px;
  }

  .login-form {
    margin: 50px auto;
    padding: 20px;
    max-width: 400px;
    background-color: #f9f9f9;
    border-radius: 8px;
    text-align: center;
  }

  .login-form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .login-form button {
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .login-form button:hover {
    background-color: #555;
  }

  .logout-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .logout-button:hover {
    background-color: #555;
  }
`;
const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
`;

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session) {
      // Fetch orders for the logged-in user
      axios
        .get(`/api/orders?email=${session.user.email}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <AccountPageStyled>
        <Header />
        <StyledDiv>
          <div className="login-form">
            <h2>Login</h2>
            <button onClick={() => signIn()}>Sign In</button>
          </div>
        </StyledDiv>
        <Footer />
      </AccountPageStyled>
    );
  }

  return (
    <AccountPageStyled>
      <Header />
      <StyledDiv>
        <div className="account-details">
          <h2>Account Details</h2>
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <button className="logout-button" onClick={() => signOut()}>
            Logout
          </button>
        </div>
        <div className="orders">
          <h2>Previous Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div className="order" key={order._id}>
                <h4>Order ID: {order._id}</h4>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Street:</strong> {order.streetAddress}
                </p>
                <p>
                  <strong>Postal Code:</strong> {order.postalCode}
                </p>
                <p>
                  <strong>City:</strong> {order.city}
                </p>
                <p>
                  <strong>Country:</strong> {order.country}
                </p>
                <p>
                  <strong>Paid:</strong> {order.paid ? "True" : "False"}
                </p>
                <p>
                  <strong>Items:</strong>
                </p>
                <ul>
                  {order.line_items.map((item, index) => (
                    <li key={index}>
                      {item.price_data.product_data.name} - {item.quantity} x{" "}
                      {item.price_data.currency === "USD"
                        ? "$"
                        : item.price_data.currency === "GBP"
                        ? "£"
                        : item.price_data.currency}{" "}
                      {item.price_data.unit_amount}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </StyledDiv>
      <Footer />
    </AccountPageStyled>
  );
}
