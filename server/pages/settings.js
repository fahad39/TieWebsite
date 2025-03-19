import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function settings() {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState("");
  const [featuredProductPrice, setFeaturedProductPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to load products when page loads
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/products");
      setProducts(response.data);

      // Also load the current featured product settings if they exist
      const settingsResponse = await axios.get(
        "/api/settings/featured-product"
      );

      if (settingsResponse.data) {
        setFeaturedProductId(settingsResponse.data.productId || "");
        setFeaturedProductPrice(settingsResponse.data.price || "");
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  // Load products when component mounts
  useEffect(() => {
    loadProducts();
  }, []);

  // Save featured product settings
  const saveFeaturedProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/settings/featured-product", {
        productId: featuredProductId,
        price: featuredProductPrice,
      });
      toast.success("Featured product settings saved!");
    } catch (error) {
      console.error("Error saving featured product:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Settings</h1>
      <form onSubmit={saveFeaturedProduct} className="mt-6">
        <div className="flex flex-col mb-4">
          <label className="mb-1 text-sm font-medium">Featured Product</label>
          <select
            value={featuredProductId}
            onChange={(e) => setFeaturedProductId(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1 text-sm font-medium">
            Shipping Price (in GBP)
          </label>
          <input
            type="number"
            value={featuredProductPrice}
            onChange={(e) => setFeaturedProductPrice(e.target.value)}
            placeholder="Enter featured price"
            className="p-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </Layout>
  );
}

export default settings;
