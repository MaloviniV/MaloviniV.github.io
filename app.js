import express from "express"; //importo express prueba
import fetch from "node-fetch"; //importo fetch para Node.js
import fs from "fs/promises";

const URL_API = "https://restcountries.com/v3.1/all";
const puerto = 3000;
const app = express(); //Creo el objeto express

app.use(express.static("public"));  //Permite acceder al html solo poniendo http://localhost:3000/ 

app.get("/api/all", async (req, res) => {      //relaciono el server con el clientes
  try {
    const pregunta = await fetch(URL_API);    //solicito a la api
    const data = await pregunta.json();
    res.json(data);   //envio los datos a la API como respuesta
  } catch (error) {
    console.error("Ocurrio un error con el fetch, ", error);
    res.status(500).send("Error al obtener los datos de la API");
  }
});

app.get("/api/ranking", async (req, res) => {
  try {
        const archivo = await fs.readFile("./ranking.txt","utf-8");
        res.json(archivo);
      } catch (err) {
        console.error("Error al leer el archivo:" + err);
        res.status(500).send("Error al leer el archivo");
      }
});

app.post("/api/ranking",(req, res) => {
  try {
  const nuevoRanking = req.body.ranking;
  const rutaArchivo = "./ranking.txt";

  fs.writeFile(rutaArchivo,nuevoRanking);
  console.log("Ranking actualizado correctamente");
  } catch (error) {
    console.error("ERROR al actualizar el ranking:" + err);
    res.status(500).send("ERROR al actualizar el ranking");
  }
  
});

app.listen(puerto, () => {          //Inicio el servidor en http://localhost:3000
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});