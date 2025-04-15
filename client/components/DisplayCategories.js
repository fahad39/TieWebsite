import styled from "styled-components";
import Center from "@/components/Center";
import Title from "./Title";
import Link from "next/link";

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

export default function DisplayCategories({ title, _id = "" }) {
  const url = "/category/" + _id;
  return (
    <Center>
      <DisplayCategorydiv>
        <Title>{title}</Title>
        <Nav href={url}>
          <p className="categoryDetail">Show All</p>
        </Nav>
      </DisplayCategorydiv>
    </Center>
  );
}
