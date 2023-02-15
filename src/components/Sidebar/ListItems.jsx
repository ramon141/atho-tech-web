import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../services/auth";

export default function ListItems() {
  const navigate = useNavigate();

  return (
    <List>
      <Divider />

      <ListItem>
        <ListItemButton onClick={() => navigate("/choice-kits")}>
          <ListItemText primary={"Escolher Kit"} />
        </ListItemButton>
      </ListItem>

      <ListItem>
        <ListItemButton onClick={() => navigate("/calculate")}>
          <ListItemText primary={"Calculadora"} />
        </ListItemButton>
      </ListItem>

      {ROLE === "Admin" ? (
        <>
          <ListItem>
            <ListItemButton onClick={() => navigate("/register-seller")}>
              <ListItemText primary={"Cadastro de Vendedores"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/products-pricing")}>
              <ListItemText primary={"Editar preço dos produtos"} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate("/register-product")}>
              <ListItemText primary={"Cadastrar Produto"} />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        false
      )}
    </List>
  );
}
