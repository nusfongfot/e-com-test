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
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import StarIcon from "@mui/icons-material/Star";

type Props = {
  products: any[];
  setProducts: Dispatch<SetStateAction<any[]>>;
  carts: any[];
  setCarts: Dispatch<SetStateAction<any[]>>;
  loading: boolean;
};

export default function ProductsCards({
  products,
  loading,
  carts,
  setCarts,
}: Props) {
  const addToCart = (item: any[]) => {
    const exists = carts.some((item1) => item1 == item);
    if (exists) return;
    setCarts([...carts, item]);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container>
        {(loading ? Array.from(new Array(products.length)) : products).map(
          (item) => (
            <Grid item xs={12} md={4} sx={{ mb: 3 }} key={item?.id}>
              <Card sx={{ maxWidth: 345 }}>
                {item ? (
                  <Typography
                    sx={{
                      background: "rgba(236, 236, 236,1)",
                      width: "150px",
                      borderRadius: 50,
                      mt: 1,
                      mb: 1,
                      ml: 1,
                    }}
                    align="center"
                  >
                    {item.category}
                  </Typography>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={20}
                    sx={{ mb: 1 }}
                  />
                )}

                {item ? (
                  <CardMedia
                    component="img"
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    image={item.image}
                    title="green iguana"
                  />
                ) : (
                  <Skeleton variant="rectangular" width={"100%"} height={250} />
                )}

                {item ? (
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title.substring(0, 21) + "..."}
                    </Typography>
                    <Stack flexDirection={"row"} gap={3} alignItems={"center"}>
                      <Stack flexDirection={"row"} alignItems={"center"}>
                        <StarIcon
                          sx={{ fontSize: 20, color: "rgb(243, 225, 107)" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {item.rating.rate}
                        </Typography>
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        {item.rating.count + " reviews"}
                      </Typography>
                    </Stack>
                  </CardContent>
                ) : (
                  <Box>
                    <Skeleton width="100%" height={"30px"} />
                    <Skeleton width="60%" height={"30px"} />
                  </Box>
                )}

                {item ? (
                  <Stack
                    sx={{ p: 1 }}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography>${item.price}</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                ) : (
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Skeleton width="40%" height={"40px"} />
                    <Skeleton width="40%" height={"40px"} />
                  </Stack>
                )}
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
