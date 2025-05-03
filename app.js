import express from "express";  //importo express para manipulacion de peticiones
import fs from "fs/promises";   //importo fs para manipulacion de archivos
import path from "path";        //importo PATH para trabajar con rutas de achivos y directorios
import url from "url";          //importo URL para trabajar con rutas URL

const puerto = process.env.puerto || 3000;
const app = express(); //Creo el objeto express

const __filename = url.fileURLToPath(import.meta.url);    //Importo la URL de app.js y la transformo en ruta de Archivo con FILEURLTOPATH
const __dirname = path.dirname(__filename);               //Recupero el directorio del archivo
const dirPublic = path.join(__dirname, 'public');

const archivoRanking = path.join(__dirname, 'ranking.txt');     //Construyo la ruta de mi archivo

app.use(express.static(path.join(__dirname, 'public')));    //middleware para servir archivos estaticos de la carpeta public

// Middleware para procesar JSON
app.use(express.json());

//RUTA PARA SERVIR EL HTML EN LA RAIZ
app.get('/', (req, res) => {      
  res.sendFile(path.join(dirPublic, 'index.html'));
});

//RUTA PARA SERVIR LOS DATOS DEL ARCHIVO RANKING.TXT
app.get("/ranking.txt", async (req, res) => {
  try {
      const archivo = await fs.readFile(archivoRanking,"utf-8");
      const datos = JSON.parse(archivo);  //Parseo el texto a JSON
      res.json(datos);    //Respondo con los datos en formato JSON
  } catch (error) {
    if(error.code === "ENOENT"){    //Si el archivo no exite
      console.log(`Archivo no encontrado, creando uno nuevo.....`);
      await fs.writeFile(archivoRanking,JSON.stringify([]));    //Creo un archivo vacio
      console.log("Archivo creado correctamente");
      res.json([]); //Respondo con datos vacios
    }else{
      console.error("Error al leer el archivo:" + error);
      res.status(500).send("Error al leer el archivo");
    }
  }
});

//RUTA PARA MODIFICAR O CREAR EL ARCHIVO RANKING.TXT
app.post("/ranking.txt",async (req, res) => {
  try {
      let nuevoRanking = req.body;    //Recupero el cuerpo del requerimiento (datos)
      
//Valido que el ranking no este vacio y lo formateo para guardarlo de una forma legible
      if (!nuevoRanking) {
        return res.status(400).json({ error: "Ranking no proporcionado" });
      }else{
        nuevoRanking = JSON.stringify(nuevoRanking,null,2);
      }

      await fs.writeFile(archivoRanking,nuevoRanking);

      console.log("Ranking actualizado correctamente");
      res.status(200).send("Ranking actualizado");
  } catch (error) {
    console.error("ERROR al actualizar el ranking:" + error);
    res.status(500).send("ERROR al actualizar el ranking");
  }  
});

app.listen(puerto, () => {          //Inicio el servidor en http://localhost:3000
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});