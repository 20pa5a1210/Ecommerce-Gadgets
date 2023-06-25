import { useState, useEffect } from "react";
import { BaseProduct } from "../ProductManagement/ProductModels";
import Products from "./Prodcuts";

export default function ProductPage() {
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  const [cache, setCache] = useState<{ [key: string]: BaseProduct[] }>({});

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, productsPerPage]);

  const fetchProducts = async () => {
    const cacheKey = `${currentPage}-${productsPerPage}`;

    if (cache[cacheKey]) {
      // Retrieve data from cache if available
      setProducts(cache[cacheKey]);
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/products/page?page=${currentPage}&pageSize=${productsPerPage}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: data.products,
        }));
      } catch (error) {
        console.log("Error Fetching Products", error);
      }
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
        <h2 className="text-xl space-x-3 px-4">Loading...</h2>
      </div>
    );
  }
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {products && <Products products={products} />}
      <div className="flex items-center justify-center my-4">
        <button
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-800">Page {currentPage}</span>
        <button
          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage * productsPerPage >= totalProducts}
        >
          Next
        </button>
      </div>
    </>
  );
}
