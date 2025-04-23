import styled from "styled-components";
import Center from "@/components/Center";
import Title from "./Title";
import Link from "next/link";
import ProductBox from "./ProductBox";

const DisplayCategorydiv = styled.div`
  display: flex;
  align-items: baseline;

  .categoryDetail {
    margin-left: 10px;
    text-decoration: underline;
  }
`;

const Nav = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const NavBox = styled(Link)`
  color: #fff;
  opacity: 0.7;
  text-decoration: none;
  background-color: grey;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const NoCatBox = styled.div`
  color: #fff;
  opacity: 0.7;
  text-decoration: none;
  background-color: grey;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function DisplayCategories({ title, _id = "", products = [] }) {
  const url = "/category/" + _id;
  return (
    <Center>
      <DisplayCategorydiv>
        <Title>{title}</Title>
        <Nav href={url}>
          <p className="categoryDetail">Show All</p>
        </Nav>
      </DisplayCategorydiv>

      <StyledProductsGrid>
        {products.length > 0 ? (
          <>
            {products.map((item) => (
              <ProductBox
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                images={item.images}
              />
            ))}
            <NavBox href={url}>
              <p className="categoryDetail">
                Show All <i className="bi bi-arrow-right"></i>
              </p>
            </NavBox>
          </>
        ) : (
          <NoCatBox>No Items</NoCatBox>
        )}
      </StyledProductsGrid>
    </Center>
  );
}
