import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import axios from "axios";

const link = [
  { id: 1, title: "All", label: "" },
  { id: 2, title: "Men's clothing", label: "men's clothing" },
  { id: 3, title: "Jewelery", label: "jewelery" },
  { id: 4, title: "Electronics", label: "electronics" },
  { id: 5, title: "Women's clothing", label: "women's clothing" },
];

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BasicBreadcrumbs({ setProducts, setLoading }: Props) {
  const [type, setType] = React.useState<string>("");

  console.log("type", type == "");
  const getApi = async () => {
    setLoading(true);
    try {
      if (type) {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/category/${type}`
        );
        const newData = data.map((item: any) => {
          return {
            ...item,
            qty: 1,
          };
        });
        setProducts(newData);
      } else {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        const newData = data.map((item: any) => {
          return {
            ...item,
            qty: 1,
          };
        });
        setProducts(newData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function handleClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    title: string
  ) {
    event.preventDefault();
    setType(title);
  }

  React.useEffect(() => {
    getApi();
  }, [type]);
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {link.map((item) => (
          <Link
            underline="hover"
            color="inherit"
            href="/"
            key={item.id}
            onClick={(e: any) => handleClick(e, item.label)}
            sx={{ color: item.label == type ? "rgb(243, 225, 107)" : "" }}
          >
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
