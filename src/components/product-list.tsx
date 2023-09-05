import { ProductWithCount } from "@/pages";
import React from "react";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

const ProductList = ({ kind }: ProductListProps) => {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);

  return data ? (
    <React.Fragment>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </React.Fragment>
  ) : null;
};

export default ProductList;
