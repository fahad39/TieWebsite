import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { Settings } from "@/models/Settings";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  // Get featured product from settings collection
  const featuredProductSetting = await Settings.findOne({
    key: "featuredProduct",
  });

  let featuredProduct = null;
  if (featuredProductSetting?.value?.productId) {
    // If we have a featured product setting, get the product
    featuredProduct = await Product.findById(
      featuredProductSetting.value.productId
    );

    // If a featured price exists, override the regular price
    if (featuredProduct && featuredProductSetting.value.price) {
      // Create a new object to avoid modifying the model
      featuredProduct = featuredProduct.toObject();
      featuredProduct.featuredPrice = featuredProductSetting.value.price;
    }
  }

  // Fallback to hard-coded ID if no setting found
  if (!featuredProduct) {
    const fallbackId = "67b5ff33dbc4f689443ec777";
    featuredProduct = await Product.findById(fallbackId);
  }

  // Get new products
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
