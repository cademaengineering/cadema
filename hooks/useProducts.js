// hooks/useProducts.js
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          profiles (
            full_name,
            avatar_url
          )
        `
        )
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([productData])
        .select();

      if (error) throw error;
      console.log("Product added:", data[0]);
      setProducts([data[0], ...products]);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return { products, loading, addProduct, refetch: fetchProducts };
};
