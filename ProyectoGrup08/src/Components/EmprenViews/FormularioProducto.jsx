import React, { useEffect, useState } from "react";
import { Avatar, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PublicIcon from "@mui/icons-material/Public";
import MainNavbar from "./../Navbar/MainNavbar";
import { Add, Camera, Home, Message } from "@mui/icons-material";
import { wrap } from "framer-motion";
import "../EmprenViews/Cards.css";
import { createProducto } from "../../services/app.services";
import { createProductoValidator } from '../../validators/form.Validator';



const FormularioProducto = () => {
  const initialFormData = {
    nombreProducto: "",
    descripcionProducto: "",
    precio: 0,
    imagenProducto: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showErrorConfirmation, setShowErrorConfirmation] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos enviados al servidor:", formData);

    const validationErrors = createProductoValidator(formData);

    setErrorMessages([]);

    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors);
      return;
  }

  try {
      await createProducto(formData);
      setShowConfirmation(true);
      setFormData(initialFormData);
  } catch (error) {
      console.error(error);
      setErrorMessages([error.message]);
      setShowErrorConfirmation(true);
  }

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(Object.values(validationErrors));
      return;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };


  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const closeErrorConfirmation = () => {
    setShowErrorConfirmation(false);
  };

  const item = {
    py: "12px",
    px: 8,
    color: "black",
    "&:hover, &:focus": {
      bgcolor: "#ffe7e5",
    },
  };

  const paperStyle = {
    width: "200px",
    overflow: "auto",
    height: "100vh",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    //este codigo de aqui es para crear una barra lateral como la de los dashboard principales, sea de emprendedor o cliente
    <Box>
      <Box>
        <MainNavbar />
      </Box>
      <Paper sx={paperStyle}>
        <List>
          <ListItem>
            <Avatar sx={{ marginRight: 3 }} />
            <ListItemText
              sx={{ color: "black", marginRight: 3, flexWrap: wrap }}
            >
              <p>Tortas el chowy</p>{" "}
            </ListItemText>
          </ListItem>
        </List>
        <Box sx={{ display: "flex" }}>
          <List sx={{ padding: "80px" }}>
            <Box sx={{ bgcolor: "#fff" }}>
              <ListItem disablePadding>
                <Link to={"/Home-Emprendedor"}>
                  <ListItemButton sx={item}>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to={"/Historias-Emprendedor"}>
                  <ListItemButton sx={item}>
                    <ListItemIcon>
                      <Camera />
                    </ListItemIcon>
                    <ListItemText>Historias</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to={"/CrearProducto-Emprendedor"}>
                  <ListItemButton sx={item}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText>Agregar Producto</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to={"/Explorar-Emprendedor"}>
                  <ListItemButton sx={item}>
                    <ListItemIcon>
                      <PublicIcon />
                    </ListItemIcon>
                    <ListItemText>Explorar</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to={"/ChatEmprendedor"}>
                  <ListItemButton sx={item}>
                    <ListItemIcon>
                      <Message />
                    </ListItemIcon>
                    <ListItemText>Chats</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            </Box>
          </List>
        </Box>
      </Paper>
      <Box
        sx={{
          marginLeft: "170px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          color: "white"
        }}
      >
        <main className="max-w-[750px] mx-auto p-8">
          <h2 className="text-2xl pb-6 text-red-500 font-bold tracking-wider text-center">
            Crea un nuevo producto
          </h2>
          <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Title */}
            <div>
              <label htmlFor="nombreProducto" className={"font-semibold text-lg  text-white"}>
                nombre del producto
              </label>

              <input
                id={"nombreProducto"}
                name={"nombreProducto"}
                className={
                  "border-gray-400 mt-2 py-2.5 px-4 border rounded-md w-full bg-[#202328]"
                }
                placeholder={"Enter the nombreProducto"}
                type={"text"}
                value={formData.nombreProducto}
                onChange={handleChange}
              />
            </div>

            {/* Review */}
            <div>
              <label htmlFor="descripcionProducto" className={"font-semibold  text-white"}>
                Descripcion
              </label>

              <textarea
                id={"descripcionProducto"}
                name={"descripcionProducto"}
                className={
                  "border-gray-400 mt-2 py-2.5 px-4 border rounded-md w-full  text-white bg-[#202328]"
                }
                placeholder={"Ingrese una descripcion"}
                type={"text"}
                rows={5}
                value={formData.descripcionProducto}
                onChange={handleChange}
              />
            </div>

            {/* price */}
            <div>
              <label htmlFor="precio" className={"font-semibold  text-white"}>
                Precio
              </label>

              <input
                id={"precio"}
                name={"precio"}
                className={
                  "border-gray-400 mt-2 py-2.5 px-4 border rounded-md w-full  text-white bg-[#202328]"
                }
                placeholder={"Ingrese el precio"}
                type={"number"}
                value={formData.precio}
                onChange={handleChange}
              />
            </div>

            {/* Cover */}
            <div>
              <label htmlFor="imagenProducto" className={"font-semibold  text-white"}>
                Imagen del producto
              </label>
              <input
                id={"imagenProducto"}
                name={"imagenProducto"}
                className={
                  "border-gray-400 mt-2 py-2.5 px-4 border rounded-md w-full bg-[#202328]"
                }
                placeholder={"Ingrese el link para su imagen"}
                type={"text"}
                value={formData.imagenProducto}
                onChange={handleChange}
              />
            </div>

            {errorMessages.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Attention:</strong>
                <ul>
                  {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-l bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-700"
            >
              Crear producto
            </button>
            console.log(formData);
            <Link to="/Ajustes-Emprendedor">
              <button className="w-full flex items-center justify-center gap-2 rounded-l  px-4 py-2 font-bold text-white transition border-red-600 border-2">
                Regresar
              </button>
            </Link>
          </form>
          {/* Ventana emergente de confirmación */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div
                className="bg-white p-6 rounded-md"
                style={{ color: "black" }}
              >
                <p className="text-lg font-semibold mb-4">
                  Producto creado con exito!
                </p>
                <button
                  onClick={closeConfirmation}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showErrorConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md text-black">
                <p className="text-lg font-semibold mb-4">
                  Un error occurrio mientras se creaba el producto. Por favor
                  intenta nuevamente.
                </p>
                <button
                  onClick={() => {
                    closeErrorConfirmation();
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      </Box>
    </Box>
  );
};

export default FormularioProducto;
