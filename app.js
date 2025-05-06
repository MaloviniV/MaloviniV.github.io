import express from "express";  //importo express para manipulacion de peticiones
import fs from "fs/promises";   //importo fs para manipulacion de archivos
import path from "path";        //importo PATH para trabajar con rutas de achivos y directorios
import url from "url";          //importo URL para trabajar con rutas URL

const puerto = process.env.puerto || 3000;    //Garantiza que el servidor se puedo desplegar en servidores externos y locales
const app = express(); //Creo el objeto express

const __filename = url.fileURLToPath(import.meta.url);    //Importo la URL de app.js y la transformo en ruta de Archivo con FILEURLTOPATH
const __dirname = path.dirname(__filename);               //Recupero el directorio del archivo

const archivoRanking = path.join(__dirname, 'ranking.txt');     //Construyo la ruta de mi archivo ranking

app.use(express.json());    // Middleware para procesar JSON mas facil

app.use(express.static(path.join(__dirname, 'public')));    //middleware para servir archivos estaticos de la carpeta public

//RUTA PARA SERVIR LOS DATOS DEL ARCHIVO RANKING.TXT
app.get("/ranking.txt", async (req, res) => {
  try {
      const archivo = await fs.readFile(archivoRanking,"utf-8");
      const datos = JSON.parse(archivo);  //Parseo el texto a JSON

      console.log(`Datos enviados: ${JSON.stringify(datos, null, 2)}`);
      res.status(200).json(datos);    //Respondo con los datos en formato JSON
      
  } catch (error) {
    if(error.code === "ENOENT"){    //Si el archivo no exite
      console.log(`Archivo no encontrado, creando uno nuevo.....`);
      await fs.writeFile(archivoRanking,JSON.stringify([]));    //Creo un archivo vacio
      console.log("Archivo creado correctamente");
      res.status(200).json([]); //Respondo con el estado y datos vacios
      
    }else if (error instanceof SyntaxError) {   //Si el archivo no tiene un formato valido
      console.error("El archivo no contiene un formato JSON válido:", error);
      res.status(500).send("El archivo no contiene un formato JSON válido");

    }else{
      console.error("Error al leer el archivo:" + error);
      res.status(500).send("Error al leer el archivo");
    }
  }
});

//RUTA PARA MODIFICAR O CREAR EL ARCHIVO RANKING.TXT
let escribiendo = false;
app.post("/ranking.txt",async (req, res) => {
  try {
    if(escribiendo){
      console.error("¡¡¡Servidor ocupado!!!");      
      return res.status(503).send("¡¡¡Servidor ocupado!!!");  //Retorno Servidor ocupado
    }else{
      escribiendo=true;   //Ocupo el servidor
    }

    let nuevoRanking = req.body;    //Recupero el cuerpo del requerimiento (datos JSON)
      
//Valido que el ranking no este vacio y lo formateo para guardarlo de una forma legible
    if (!nuevoRanking) {
      console.log("Ranking no proporcionado al POST");
      return res.status(400).send("Ranking no proporcionado" );
    }else{
      nuevoRanking = JSON.stringify(nuevoRanking,null,2);     //Parseo el JSON a String para guardarlo
    }

    await fs.writeFile(archivoRanking,nuevoRanking);

    console.log("Ranking actualizado correctamente");
    res.status(200).send("Ranking actualizado");
  } catch (error) {
    console.error("ERROR al actualizar el ranking:" + error);
    res.status(500).send("ERROR al actualizar el ranking");
  } finally {
    escribiendo = false; //Desocupo el servidor
  }
});

//Middleware para manejar las rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

//Middleware para el manejo de errores, captura cualquier error
app.use((err, req, res, next) => { 
  console.error('Error interno:', err);
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(puerto, () => {          //Inicio el servidor en http://localhost:3000
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});