import { useState } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import ProductsGrid from "@/components/ProductsGrid";

const CategoryDescriptonStyled = styled.div`
  .filter-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default function CategoryPage({ category, products }) {
  const { addProduct } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  console.log(products);

  const handleFilter = (filterType) => {
    let sortedProducts = [...products];
    if (filterType === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (filterType === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (filterType === "latest") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (filterType === "oldest") {
      sortedProducts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    setFilteredProducts(sortedProducts);
  };
  return (
    <CategoryDescriptonStyled>
      <Header />
      <Center>
        <div className="filter-div">
          <h1>{category.name}</h1>
          <div>
            <select
              onChange={(e) => handleFilter(e.target.value)}
              style={{ padding: "5px", fontSize: "1rem" }}
            >
              <option value="">Filter By</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <ProductsGrid products={filteredProducts} />
      </Center>
    </CategoryDescriptonStyled>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const category = await Category.findById(id).lean();
  if (!category) {
    return {
      notFound: true, // Return a 404 page if the category is not found
    };
  }
  const products = await Product.find({ category: category._id }).lean();
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
