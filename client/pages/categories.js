import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
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
        {categories.length == 0 ? (
          <div className="noCategoryDiv">
            <Title>No Categories Found</Title>{" "}
          </div>
        ) : (
          <>
            {categories.map((item) => (
              <DisplayCategories
                title={item.name}
                key={item._id}
                _id={item._id}
                products={item.products}
              />
            ))}
          </>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  // Fetch 3 products for each category
  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const item = JSON.parse(JSON.stringify(category));
      const products = await Product.find({ category: category._id })
        .limit(3)
        .lean(); // Use .lean() for better performance
      return {
        ...item, // Convert Mongoose document to plain object
        products,
      };
    })
  );
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categoriesWithProducts)),
    },
  };
}
