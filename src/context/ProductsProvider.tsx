import React, { createContext, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

export type UseProductsContextType = {
  products: ProductType[];
};

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[];
};

const initialState: ProductType[] = [];
// const initialState: ProductType[] = [
//   {
//     sku: "item0001",
//     name: "Widget",
//     price: 9.99,
//   },
//   {
//     sku: "item0002",
//     name: "Premium Widget",
//     price: 19.99,
//   },
//   {
//     sku: "item0003",
//     name: "Deluxe Widget",
//     price: 29.99,
//   },
// ];

const initialContextState: UseProductsContextType = { products: [] };

const ProductsContext =
  createContext<UseProductsContextType>(initialContextState);

export const ProductsProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((response) => response.json())
        .catch((err) => {
          if (err instanceof Error) {
            console.log(err.message);
          }
        });
      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
