import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import DisplayCategories from "@/components/DisplayCategories";

const Categorydiv = styled.div`
  .noCategoryDiv {
    display: flex;
    justify-content: center;
  }
`;

export default function CategoriesPage({ categories }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Categories Page</Title>
        {categories.length == 0 ? (
          <div className="noCategoryDiv">
            <Title>No Categories Found</Title>{" "}
          </div>
        ) : (
          categories.map((item) => (
            <DisplayCategories
              title={item.name}
              key={item._id}
              _id={item._id}
            />
          ))
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
