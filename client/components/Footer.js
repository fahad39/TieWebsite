import styled from "styled-components";

const FooterStyled = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 50px;

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
  }

  a:hover {
    text-decoration: underline;
  }

  .footer-links {
    margin-top: 10px;
  }
`;

export default function Footer() {
  return (
    <FooterStyled>
      <p>&copy; {new Date().getFullYear()} TieWebsite. All rights reserved.</p>
      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </FooterStyled>
  );
}
