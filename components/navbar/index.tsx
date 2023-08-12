import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Divider, Stack, styled } from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchItem from "../searchItem";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

type Props = {
  carts: any[];
  setCarts: React.Dispatch<React.SetStateAction<any[]>>;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  products: any[];
  getApi: () => void;
};
export default function MenuAppBar({
  carts,
  setCarts,
  products,
  setProducts,
  getApi,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [total, setTotal] = React.useState<number>(0);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (carts.length == 0) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: number) => {
    const filter = carts.filter((item) => item.id !== id);
    setCarts(filter);
  };

  const updateQty = (row: any, type: string) => {
    setCarts((prevCarts) => {
      return prevCarts.map((product) => {
        if (product.id === row.id) {
          return {
            ...product,
            qty: type == "plus" ? product.qty + 1 : product.qty - 1,
          };
        }
        return product;
      });
    });
  };

  React.useEffect(() => {
    const valueTotal = carts
      .reduce((acc, value) => acc + value.price * value.qty, 0)
      .toFixed(2);
    setTotal(valueTotal);
  }, [carts]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Scorpion Shop
          </Typography>

          <Box flexGrow={3}>
            <SearchItem
              setProducts={setProducts}
              products={products}
              getApi={getApi}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <StyledBadge badgeContent={carts.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {carts.map((item) => (
                <Stack
                  sx={{ width: 300, p: 1 }}
                  flexDirection={"row"}
                  gap={2}
                  justifyContent={"space-between"}
                  key={item.id}
                >
                  <img
                    src={item.image}
                    style={{ width: 60, height: 60, background: "red" }}
                  />
                  <Box>
                    <Typography>
                      {item.title.substring(0, 10) + "..."}
                    </Typography>
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignContent={"center"}
                    >
                      <Button
                        variant="outlined"
                        sx={{ height: 20, width: 10 }}
                        onClick={() => updateQty(item, "minus")}
                        disabled={item.qty == 1 ? true : false}
                      >
                        -
                      </Button>
                      <Typography> {item.qty} </Typography>
                      <Button
                        variant="outlined"
                        sx={{ height: 20, width: 10 }}
                        onClick={() => updateQty(item, "plus")}
                      >
                        +
                      </Button>
                    </Stack>
                  </Box>
                  <Box>
                    <Button
                      variant="text"
                      sx={{ height: 20, width: 10, color: "red" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                    <Typography>${item.price}</Typography>
                  </Box>
                </Stack>
              ))}

              {carts.length !== 0 && (
                <>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Stack
                    sx={{ p: 1 }}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography>Total</Typography>
                    <Typography>{total}$</Typography>
                  </Stack>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
