import { Box, FormControl, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  products: any[];
  getApi: () => void;
};

export default function SearchItem({ products, setProducts, getApi }: Props) {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const findItem = products.filter((item) => {
      const findTitle = item.title.toLowerCase().includes(search.toLowerCase());
      const findDesc = item.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const findCate = item.category
        .toLowerCase()
        .includes(search.toLowerCase());
      return findTitle || findDesc || findCate;
    });
    console.log("find", findItem);
    setProducts(findItem);
  };

  useEffect(() => {
    if (!search) {
      getApi();
    }
  }, [search]);

  return (
    <Box
      component={"form"}
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleSearch(e)}
    >
      <TextField
        value={search}
        sx={{ background: "white" }}
        size="small"
        placeholder="search..."
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
    </Box>
  );
}
