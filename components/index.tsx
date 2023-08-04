import MenuAppBar from "@/components/navbar";
import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import BasicBreadcrumbs from "./breadcrumbs";
import ProductsCards from "./productCards";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getApi = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      const newData = data.map((item: any) => {
        return {
          ...item,
          qty: 1,
        };
      });
      setProducts(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <MenuAppBar setCarts={setCarts} carts={carts} />
      <Container maxWidth={"lg"} sx={{ mt: 2 }}>
        <BasicBreadcrumbs setProducts={setProducts} setLoading={setLoading} />
        {loading ? (
          <Grid container>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Grid xs={12} md={4}>
                <Box sx={{ maxWidth: 345 }}>
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={20}
                    sx={{ mb: 1, mt: 1 }}
                  />
                  <Skeleton variant="rectangular" width={"100%"} height={250} />
                  <Box>
                    <Skeleton width="100%" height={"30px"} />
                    <Skeleton width="40%" height={"30px"} />
                  </Box>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Skeleton width="40%" height={"40px"} />
                    <Skeleton width="40%" height={"40px"} />
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <ProductsCards
            products={products}
            setProducts={setProducts}
            loading={loading}
            setCarts={setCarts}
            carts={carts}
          />
        )}
      </Container>
    </div>
  );
}
