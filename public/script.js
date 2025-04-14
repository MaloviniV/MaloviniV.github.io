class Interfaz {      //Recupera los botones, maneja vistas importantes y agrega listeners
  static init() {
    //Inicializa elementos vistas importantes
    this.inicio = document.querySelector(".inicio");
    this.ranking = document.querySelector(".ranking");
    this.juego = document.querySelector(".juego");
    this.nombre = document.getElementById("nombre");
    this.btnJugar = document.getElementById("btnJugar");
    this.btnRanking = document.getElementById("btnRanking");
    this.btnInicio = document.getElementById("btnInicio");

    this.btnJugar.addEventListener("click", async () => {
      const txtNombre = this.nombre.value.trim(); // Elimina los espacios en blanco al inicio y al final del nombre
      if (!txtNombre) {
        this.highlightError(this.nombre);
        this.nombre.focus();
        return;
      }

      await Data.cargarPaises();
      Juego.iniciarJuego(10, txtNombre);
      this.viewPlay();
    });
    this.btnRanking.addEventListener("click", () => this.viewRanking());
    this.btnInicio.addEventListener("click", () => this.return());
  }

  static viewPlay() {
    //Muestra la vista para jugar
    this.toggleView(this.inicio, this.juego);
  }

  static viewRanking() {
    //Muestra la vista ranking
    this.toggleView(this.inicio, this.ranking);
  }

  static return() {
    //Maneja el boton volver
    this.toggleView(this.ranking, this.inicio);
  }

  static highlightError(inputElement) {
    //Resalta error por 2 segundos ( Coloca clase CSS "error" )
    inputElement.classList.add("error");
    setTimeout(() => {
      inputElement.classList.remove("error");
    }, 2000); // El resaltado desaparece después de 2 segundos
  }

  static toggleView(...elements) {
    // Toggle alterna la clase ocultar  (saca y pone la clase CSS "ocultar")
    elements.forEach((element) => {
      element.classList.toggle("ocultar");
    });
  }
}
//Clase para recuperar datos del servidor y archivos
class Data {      //VALIDAR DATOS DE LA RESP "capital","flag","borders"(CARGAR SOLO DATOS NECESARIOS)
  static listaPaises = [];
  static ranking = [];

  static async cargarPaises() {
    this.listaPaises = [
      {
        name: "Argentina",
        flags: "🇦🇷",
        borders: ["Chile", "Bolivia", "Paraguay", "Uruguay", "Brasil"],
        capital: "Buenos Aires",
      },
      {
        name: "Brasil",
        flags: "🇧🇷",
        borders: [
          "Argentina",
          "Uruguay",
          "Paraguay",
          "Bolivia",
          "Perú",
          "Colombia",
          "Venezuela",
        ],
        capital: "Brasilia",
      },
      {
        name: "Chile",
        flags: "🇨🇱",
        borders: ["Argentina", "Bolivia", "Perú"],
        capital: "Santiago",
      },
      {
        name: "Uruguay",
        flags: "🇺🇾",
        borders: ["Argentina", "Brasil"],
        capital: "Montevideo",
      },
      {
        name: "Perú",
        flags: "🇵🇪",
        borders: ["Brasil", "Bolivia", "Chile", "Colombia", "Ecuador"],
        capital: "Lima",
      },
      {
        name: "Colombia",
        flags: "🇨🇴",
        borders: ["Brasil", "Perú", "Ecuador", "Panamá", "Venezuela"],
        capital: "Bogotá",
      },
      {
        name: "Venezuela",
        flags: "🇻🇪",
        borders: ["Brasil", "Colombia", "Guyana"],
        capital: "Caracas",
      },
      {
        name: "Bolivia",
        flags: "🇧🇴",
        borders: ["Argentina", "Brasil", "Chile", "Paraguay", "Perú"],
        capital: "Sucre",
      },
      {
        name: "Paraguay",
        flags: "🇵🇾",
        borders: ["Argentina", "Bolivia", "Brasil"],
        capital: "Asunción",
      },
      {
        name: "Ecuador",
        flags: "🇪🇨",
        borders: ["Colombia", "Perú"],
        capital: "Quito",
      },
      {
        name: "México",
        flags: "🇲🇽",
        borders: ["Estados Unidos", "Guatemala", "Belice"],
        capital: "Ciudad de México",
      },
      {
        name: "Estados Unidos",
        flags: "🇺🇸",
        borders: ["Canadá", "México"],
        capital: "Washington D.C.",
      },
      {
        name: "Canadá",
        flags: "🇨🇦",
        borders: ["Estados Unidos"],
        capital: "Ottawa",
      },
      {
        name: "España",
        flags: "🇪🇸",
        borders: ["Francia", "Portugal", "Andorra"],
        capital: "Madrid",
      },
      {
        name: "Francia",
        flags: "🇫🇷",
        borders: [
          "España",
          "Bélgica",
          "Luxemburgo",
          "Alemania",
          "Suiza",
          "Italia",
        ],
        capital: "París",
      },
      {
        name: "Alemania",
        flags: "🇩🇪",
        borders: [
          "Dinamarca",
          "Polonia",
          "República Checa",
          "Austria",
          "Suiza",
          "Francia",
        ],
        capital: "Berlín",
      },
      {
        name: "Italia",
        flags: "🇮🇹",
        borders: ["Francia", "Suiza", "Austria", "Eslovenia"],
        capital: "Roma",
      },
      {
        name: "Rusia",
        flags: "🇷🇺",
        borders: [
          "Noruega",
          "Finlandia",
          "Estonia",
          "Letonia",
          "Lituania",
          "Polonia",
          "China",
        ],
        capital: "Moscú",
      },
      {
        name: "China",
        flags: "🇨🇳",
        borders: ["Rusia", "Mongolia", "Corea del Norte", "Vietnam", "India"],
        capital: "Pekín",
      },
      {
        name: "India",
        flags: "🇮🇳",
        borders: ["Pakistán", "China", "Nepal", "Bután", "Bangladesh"],
        capital: "Nueva Delhi",
      },
    ];
  }

  static async cargarRanking() {
    this.ranking = [
      {
        posicion: 1,
        nombre: "Victor",
        correctas: 15,
        incorrectas: 5,
        tiempo: "10:30",
        promTiempo: "00:42",
        puntaje: 150,
      },
      {
        posicion: 2,
        nombre: "Maria",
        correctas: 20,
        incorrectas: 2,
        tiempo: "08:20",
        promTiempo: "00:25",
        puntaje: 200,
      },
      {
        posicion: 3,
        nombre: "Juan",
        correctas: 10,
        incorrectas: 8,
        tiempo: "12:15",
        promTiempo: "01:05",
        puntaje: 100,
      },
      {
        posicion: 4,
        nombre: "Ana",
        correctas: 12,
        incorrectas: 3,
        tiempo: "09:50",
        promTiempo: "00:45",
        puntaje: 120,
      },
      {
        posicion: 5,
        nombre: "Luis",
        correctas: 8,
        incorrectas: 4,
        tiempo: "11:00",
        promTiempo: "01:20",
        puntaje: 80,
      },
      {
        posicion: 6,
        nombre: "Sofia",
        correctas: 18,
        incorrectas: 3,
        tiempo: "09:05",
        promTiempo: "00:30",
        puntaje: 180,
      },
      {
        posicion: 7,
        nombre: "Carlos",
        correctas: 14,
        incorrectas: 4,
        tiempo: "10:00",
        promTiempo: "00:43",
        puntaje: 140,
      },
      {
        posicion: 8,
        nombre: "Lucia",
        correctas: 16,
        incorrectas: 6,
        tiempo: "10:30",
        promTiempo: "00:39",
        puntaje: 160,
      },
      {
        posicion: 9,
        nombre: "Diego",
        correctas: 11,
        incorrectas: 7,
        tiempo: "13:10",
        promTiempo: "01:10",
        puntaje: 110,
      },
      {
        posicion: 10,
        nombre: "Carla",
        correctas: 17,
        incorrectas: 4,
        tiempo: "09:30",
        promTiempo: "00:35",
        puntaje: 170,
      },
      {
        posicion: 11,
        nombre: "Andres",
        correctas: 13,
        incorrectas: 5,
        tiempo: "11:20",
        promTiempo: "00:52",
        puntaje: 130,
      },
      {
        posicion: 12,
        nombre: "Marta",
        correctas: 19,
        incorrectas: 2,
        tiempo: "08:40",
        promTiempo: "00:28",
        puntaje: 190,
      },
      {
        posicion: 13,
        nombre: "Javier",
        correctas: 9,
        incorrectas: 8,
        tiempo: "12:45",
        promTiempo: "01:25",
        puntaje: 90,
      },
      {
        posicion: 14,
        nombre: "Lorena",
        correctas: 20,
        incorrectas: 1,
        tiempo: "08:00",
        promTiempo: "00:24",
        puntaje: 200,
      },
      {
        posicion: 15,
        nombre: "Fernando",
        correctas: 12,
        incorrectas: 6,
        tiempo: "10:50",
        promTiempo: "00:54",
        puntaje: 120,
      },
      {
        posicion: 16,
        nombre: "Patricia",
        correctas: 15,
        incorrectas: 5,
        tiempo: "09:40",
        promTiempo: "00:38",
        puntaje: 150,
      },
      {
        posicion: 17,
        nombre: "Esteban",
        correctas: 8,
        incorrectas: 7,
        tiempo: "13:30",
        promTiempo: "01:41",
        puntaje: 80,
      },
      {
        posicion: 18,
        nombre: "Gabriela",
        correctas: 14,
        incorrectas: 4,
        tiempo: "10:20",
        promTiempo: "00:44",
        puntaje: 140,
      },
      {
        posicion: 19,
        nombre: "Raul",
        correctas: 11,
        incorrectas: 6,
        tiempo: "12:00",
        promTiempo: "00:55",
        puntaje: 110,
      },
      {
        posicion: 20,
        nombre: "Isabel",
        correctas: 16,
        incorrectas: 3,
        tiempo: "09:15",
        promTiempo: "00:40",
        puntaje: 160,
      },
    ];
  }

  static getListaPaises() {
    if (this.listaPaises.length === 0) {
      throw new Error("No hay países disponibles. Asegúrate de cargar los datos primero.");
    }
    return this.listaPaises;
  }

  static paisAleatorio() {
    const paises = this.getListaPaises();
    if (paises.length === 0) {
      throw new Error("No hay países disponibles. Cargar los datos primero.");
    }
    const random = Math.floor(Math.random() * paises.length); //Numero aleatorio
    return paises[random];
  }

  static mezclar(lista){    
    return [...lista].sort(() => Math.random() - 0.5);   //Mezclo las opciones y devuelvo un nuevo array
  };

  /*
  static URL_API = "/api/all";
  static URL_RANKING = "/api/ranking"
  static listaPaises = [];
  static listaRanking = []
  
  static async cargarDatos() {
    try {
      const answer = await fetch(this.URL_API);
      const data = await answer.json();
      console.log(data);
      this.listaPaises = data;
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  static getPaises() {
    return this.listaPaises;
  }

  static async cargarArchivo(){
    try {
      const answer = await fetch(this.URL_RANKING);
      const data = answer.json();
      console.log(data);
      this.listaRanking = data;
    } catch (error) {
      console.error("Error al cargar el archivo"+error);      
    }
  }

  static getRanking(){
    return this.listaRanking;
  }

  static setRanking(ranking){
    const options = {
      method: "POST",                           // Método HTTP PUT
      headers: {
        "Content-Type": "application/json",     // Indica que el cuerpo es JSON
      },
      body: JSON.stringify(ranking),       // Convierte el objeto a JSON
    }

    try {
      await fetch(this.URL_RANKING,options);
      console.log("Ranking actualizado correctamente");      
    } catch (error) {
      console.error("Error al enviar el PUT al servidor:", error);      
    }
  }
    */
}

class Juego {     //FALTA CARGAR RANKING
  static jugador;
  static listaPreguntas;
  static ranking;
  static preguntaActual = 0;
  static #tiposPreguntas = ["capital", "flag", "borders"];

  static iniciarJuego(cantPreguntas, nombreJugador) {
    this.jugador = new Jugador(nombreJugador);
    this.listaPreguntas = this.#cargarPreguntas(cantPreguntas);
    this.ranking = []; //Lista de estadisticas de los jugadores

    //Muestro pregunta
    this.mostrarPregunta(this.listaPreguntas[this.preguntaActual]);
  }
  //CARGO PREGUNTAS
  static #cargarPreguntas(numPreguntas) {
    const preguntas = [];

    for (let index = 0; index < numPreguntas; index++) {
      let indice = index % this.#tiposPreguntas.length; //asigno el indice siguiente de forma ciclica entre 0 y 3
      const nuevaPregunta = new Pregunta(this.#tiposPreguntas[indice]);
      //controlo que la pregunta no se encuentre en la lista de preguntas
      if (preguntas.some((preg) => preg.tipo === nuevaPregunta.tipo && preg.getRespuesta() === nuevaPregunta.getRespuesta())) {
        index--;
      } else {
        preguntas.push(nuevaPregunta);
      }
    }
    //Devuelvo la lista de preguntas
    return preguntas;
  }

  //MUESTRO LA PREGUNTA
  static mostrarPregunta(preg) {
    const contenedorPregunta = document.getElementById("pregunta");
    const contenedorOpciones = document.getElementById("opciones");
    contenedorPregunta.textContent = "";
    contenedorOpciones.textContent = "";
    console.log(preg.getOpciones());    
    
    //Muestro pregunta
    contenedorPregunta.textContent = preg.getPregunta();

    //Muestro opciones como botones
    const fragmOpciones = document.createDocumentFragment();
    const opciones = Data.mezclar(preg.getOpciones());
      
    opciones.forEach((op) => {
      const btnOpcion = document.createElement("button");
      btnOpcion.textContent = op;
      btnOpcion.value = op;
      btnOpcion.addEventListener("click", () => {escucharRespuesta(op)});
      fragmOpciones.appendChild(btnOpcion);
    });
    contenedorOpciones.appendChild(fragmOpciones);
  }
}

class Pregunta {
  static cantOpciones = 4;
  #pregunta;
  #respuesta;
  #puntos;
  #setOpciones;

  constructor(tipo) {
    this.tipo = tipo;
    this.#pregunta = null;
    this.#respuesta = null;
    this.#puntos = 0;
    this.#setOpciones = new Set();
    this.#crearPregunta();
    this.#cargarOpciones();
  }

  #crearPregunta() {
    while (!this.#pregunta) {
      let pais = Data.paisAleatorio();
      switch (this.tipo) {
        case "capital":
          if (pais?.capital) {
            this.#pregunta = `¿Cuál es el país de la capital ${pais.capital}?`;
            this.#respuesta = pais.name;
            this.#puntos = 3;
          }
          break;

        case "flag":
          if (pais?.flags) {
            this.#pregunta = `<p>¿Qué país está representado por la siguiente bandera?</p><img src="${pais.flags}">
            `;
            this.#respuesta = pais.name;
            this.#puntos = 5;
          }
          break;

        case "borders":
          if (pais?.borders) {
            this.#pregunta = `¿Cuántos países limítrofes tiene ${pais.name}?`;
            this.#respuesta = pais.borders.length;
            this.#puntos = 3;
          }
          break;

        default:
          console.error("Tipo de pregunta inexistente");
          break;
      }
    }
  }
  
  #cargarOpciones(cantOpciones = Pregunta.cantOpciones) {
    this.#setOpciones.clear();
    this.#setOpciones.add(this.#respuesta);
    while (this.#setOpciones.size < cantOpciones) {
      const pais = Data.paisAleatorio();
      this.#setOpciones.add(pais.name);
    }
  }

  getPregunta() {
    return this.#pregunta;
  }

  getRespuesta() {
    return this.#respuesta;
  }

  getPuntos() {
    return this.#puntos;
  }

  getOpciones() {
    return [...this.#setOpciones];
  }

  static setCantidadOpciones(num) {
    this.cantOpciones = num;
  }
}

class Jugador {
  puntaje;
  correctas;
  tiemposRegistrados;

  constructor(nombre) {
    this.nombre = nombre;
    this.puntaje = 0;
    this.correctas = 0;
    this.tiemposRegistrados = [];
  }
}

class Estadistica{
}
Interfaz.init();