//CREO BOTONES, maneja vistas importantes y INICIALIZO LA APLICACION
class Interfaz {      

  static init(preguntas) {
    //Inicializa elementos vistas importantes
    this.btnJugar = document.getElementById("btnJugar");
    this.btnRanking = document.getElementById("btnRanking");
    this.btnInicio = document.getElementById("btnInicio");
    this.nombre = document.getElementById("nombre");
    this.inicio = document.querySelector(".inicio");
    this.ranking = document.querySelector(".ranking");
    this.juego = document.querySelector(".juego");

    this.btnJugar.addEventListener("click", async () => {
      const txtNombre = this.nombre.value.trim(); // Elimina los espacios en blanco al inicio y al final del nombre
      if (!txtNombre) {
        this.highlightError(this.nombre);
        this.nombre.focus();
        return;
      }

      await Data.cargarPaises();
      Juego.iniciarJuego(preguntas, txtNombre);
      this.nombre.value = "";
      this.cambiarVista(this.juego);
    });
    this.btnRanking.addEventListener("click", () => this.cambiarVista(this.ranking));
    this.btnInicio.addEventListener("click", () => this.cambiarVista(this.inicio));
  }

  static cambiarVista(vistaMostrar){
    const vistas = document.querySelectorAll(".vista");

    vistas.forEach(vista=>vista.classList.add("ocultar"));

    vistaMostrar.classList.remove("ocultar");
  }

  static highlightError(inputElement) {
    //Resalta error por 2 segundos ( Coloca clase CSS "error" )
    inputElement.classList.add("error");
    setTimeout(() => {
      inputElement.classList.remove("error");
    }, 2000); // El resaltado desaparece después de 2 segundos
  }

//FUNCION PARA CREAR BOTONES
  static crearBoton(valor, callbackListener) {
    const boton = document.createElement("button");
    boton.textContent = valor;
    boton.value = valor;
    boton.addEventListener("click", callbackListener);
    return boton;
  }
}

//RECUPERO DATOS DEL SERVIDOR (api paises, json ranking)
class Data {
  //VALIDAR DATOS DE LA RESP "capital","flag","borders"(CARGAR SOLO DATOS NECESARIOS)
  static listaPaises = [];
  static ranking = [];
  static URL_API = "/api/all";
  static URL_RANKING = "/api/ranking";
  
  static async cargarPaises() {
    try {
      const answer = await fetch(this.URL_API);
      const data = await answer.json();
      this.listaPaises = data;
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
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
      throw new Error(
        "No hay países disponibles. Cargar los datos primero."
      );
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

  static mezclar(lista) {
    return [...lista].sort(() => Math.random() - 0.5); //Mezclo las opciones y devuelvo un nuevo array
  }


/*
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

//MANEJO EL JUEGO
class Juego {
  //FALTA CARGAR RANKING
  static #jugador;
  static #listaPreguntas;
  static #preguntaActual = 0;
  static #tiposPreguntas = ["capital", "flag", "borders"];
  static #cronometro;


//INSTANCIO LOS ELEMENTOS DEL JUEGO (jugador, preguntas, cronometro, interfaz)
  static iniciarJuego(cantPreguntas, nombreJugador) {
    this.#jugador = new Jugador(nombreJugador);    //Instancio un jugador
    this.#listaPreguntas = this.#cargarPreguntas(cantPreguntas);      //Cargo todas las preguntas de la partida
    this.#cronometro = new Cronometro();   //Instancio Cronometro
    
    this.#interfazJuego();
  }

  //CARGO LA LISTA DE PREGUNTAS
  static #cargarPreguntas(numPreguntas) {
    const preguntas = [];

    for (let index = 0; index < numPreguntas; index++) {
      let indice = index % this.#tiposPreguntas.length; //asigno el indice siguiente de forma ciclica entre 0 y 3
      const nuevaPregunta = new Pregunta(this.#tiposPreguntas[indice]);
      //controlo que la pregunta no se encuentre en la lista de preguntas
      if (preguntas.some((preg) => preg.tipo === nuevaPregunta.tipo &&
            preg.getRespuesta() === nuevaPregunta.getRespuesta()
        )
      ) {
        index--;
      } else {
        preguntas.push(nuevaPregunta);
      }
    }
    //Devuelvo la lista de preguntas
    return preguntas;
  }

//Cargo los contenedores al DOM
  static #interfazJuego(){
    const contenedorJuego = document.querySelector(".juego");
    contenedorJuego.textContent = "";
//Creo un fragmento temporal para hacer la carga al DOM mas eficiente
    const fragmento = document.createDocumentFragment();
//Cargo el progreso al fragmento temporal
    fragmento.appendChild(this.#contenedorProgreso());    
//Cargo la pregunta al fragmento temporal
    fragmento.appendChild(this.#contenedorPregunta(this.#listaPreguntas[this.#preguntaActual]));
//Cargo las opciones al fragmento temporal
    fragmento.appendChild(this.#contenedorOpciones(this.#listaPreguntas[this.#preguntaActual]));
//Cargo todo al DOM
    contenedorJuego.appendChild(fragmento);
    
    this.#cronometro.reiniciar();
    this.#cronometro.iniciar();    
  }

//Retorno un contenedor con el progreso (tiempo y indicador)
  static #contenedorProgreso(){

    const contedorProgreso = document.createElement("div");
    contedorProgreso.id = "progreso";

    /*------Indicador------*/
    //Indico por cual pregunta vamos
    const contePregActual = document.createElement("span");
    contePregActual.id = "indicadorPregunta";

    let indicador = `${this.#preguntaActual + 1} / ${this.#listaPreguntas.length}`;

    contePregActual.textContent = indicador;
    contedorProgreso.appendChild(contePregActual);

    /*------Tiempo------*/
    //Muestro el tiempo transcurrido en la pregunta
    const conteTiempo = document.createElement("span");
    conteTiempo.id = "tiempo";

    this.#cronometro.mostrarCronometro(conteTiempo);    //Le paso un contenedor al cronometro para que muestre el tiempo

    contedorProgreso.appendChild(conteTiempo);

    return contedorProgreso;
  }

//Retorno un contenedor con la pregunta
  static #contenedorPregunta(preg){
    const contenedorPregunta = document.createElement("div");
    contenedorPregunta.id = "pregunta"
    contenedorPregunta.innerHTML = preg.getPregunta();

    return contenedorPregunta;
  }

//Retorno un contenedor con todas las opciones
  static #contenedorOpciones(preg) {
    const contenedorOpciones = document.createElement("div");
    contenedorOpciones.id = "opciones";

    //Muestro opciones como botones
    const fragmOpciones = document.createDocumentFragment();
    const opciones = Data.mezclar(preg.getOpciones());

    opciones.forEach((op) => {
      fragmOpciones.appendChild(Interfaz.crearBoton(op,() => {
                                                            this.#cronometro.parar();
                                                            const tiempo = this.#cronometro.getTiempo();
                                                            this.#escucharRespuesta(op, tiempo);
                                                          }));
    });
    contenedorOpciones.appendChild(fragmOpciones);
    return contenedorOpciones;
  }

//ESCUCHO LA RESPUESTA DEL USUARIO
  static #escucharRespuesta(opcion, tiempo) {

    const pregunta = this.#listaPreguntas[this.#preguntaActual];
    const respuesta = pregunta.getRespuesta();

    if (opcion === respuesta) {
      //Comparo si la respuesta es correcta
      alert("Correcto");
      this.#jugador.respuestaCorrecta(pregunta.getPuntos(), tiempo); //registro la respuesta en el jugador
    } else {
      alert(`Incorrecta, la respuesta era: ${respuesta}`);

      this.#jugador.setTiempos(tiempo);
    }

    this.#preguntaActual++; //Pasa a la siguiente pregunta

    if (this.#preguntaActual < this.#listaPreguntas.length) {
      //Controlo si quedan preguntas
      this.#interfazJuego();
    } else {
      console.log("fin del juego");
      this.endGame();
    }
  }

//Limpio la pantalla e inserto dinamicamente la interfaz endGame
  static endGame() {
    const estadisticas = this.#jugador.estadistica();    //Recupero las estadisticas del jugador
    const contenedorJuego = document.querySelector(".juego");
    contenedorJuego.textContent = "";

    const fragmento = document.createDocumentFragment();
//Cargo el titulo
    const contTitulo = document.createElement("h2");
    contTitulo.textContent = "Estadisticas";
    fragmento.appendChild(contTitulo);

//Cargo las estadisticas
    const contEstadisticas = document.createElement("div");
    contEstadisticas.innerHTML = `<span><span class="label">Puntuación final:</span> ${estadisticas.puntos}</span>
                                  <span><span class="label">Preguntas correctas:</span> ${estadisticas.correctas}</span>
                                  <span><span class="label">Preguntas Incorrectas:</span> ${estadisticas.incorrectas}</span>
                                  <span><span class="label">Tiempo de la partida:</span> ${Cronometro.formatearHora(estadisticas.tiempoPartida)}</span>
                                  <span><span class="label">Tiempo promedio:</span> ${Cronometro.formatearHora(estadisticas.tiempoPromedio)}</span>
                                  `;
    fragmento.appendChild(contEstadisticas);
//Cargo el boton para ir a inicio
    fragmento.appendChild(Interfaz.crearBoton("inicio", ()=>{
      Interfaz.cambiarVista(document.querySelector(".inicio"))
    }));

    contenedorJuego.appendChild(fragmento);

    this.#preguntaActual = 0; //vuelvo la pregunta actual a 0
  }
}

//CREO LA PREGUNTA CON SUS ATRIBUTOS Y METODOS
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
            this.#pregunta = `¿Cuál es el país de la capital ${pais.capital[0]}?`;
            this.#respuesta = pais.name.common;
            this.#puntos = 3;
          }
          break;

        case "flag":
          if (pais?.flags) {
            this.#pregunta = `<p>¿Qué país está representado por la siguiente bandera?</p><img src="${pais.flags.svg}">`;
            this.#respuesta = pais.name.common;
            this.#puntos = 5;
          }
          break;

        case "borders":
          if (pais?.borders) {
            this.#respuesta = pais.borders.length;
          } else {
            this.#respuesta = 0;
          }
          this.#pregunta = `¿Cuántos países limítrofes tiene ${pais.name.common}?`;
          this.#puntos = 3;
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
      if (this.tipo === "borders") {
        //si es una pregunta de tipo limitrofe
        if (pais?.borders) {
          //Si tiene paises limitrofes
          this.#setOpciones.add(pais.borders.length);
        } else {
          this.#setOpciones.add(0);
        }
      } else {
        this.#setOpciones.add(pais.name.common);
      }
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

//CREO EL JUGADOR CON SUS ATRIBUTOS Y METODOS
class Jugador {
  #puntaje;
  #correctas;
  #tiempos;

  constructor(nombre) {
    this.nombre = nombre;
    this.#puntaje = 0;
    this.#correctas = 0;
    this.#tiempos = [];
  }

  getPuntaje() {
    return this.#puntaje;
  }

  getCorrectas() {
    return this.#correctas;
  }

  getTiempos() {
    return this.#tiempos;
  }

  setTiempos(tiempo) {
    this.#tiempos.push(tiempo);
  }

  respuestaCorrecta(puntos, tiempo) {
    this.#puntaje += puntos;
    this.#tiempos.push(tiempo);
    this.#correctas++;
  }

  estadistica() {
    const estadistica = {};

    estadistica.puntos = this.#puntaje;
    estadistica.correctas = this.#correctas;
    estadistica.incorrectas = this.#tiempos.length - this.#correctas;
    estadistica.tiempoPartida = Cronometro.sumarTiempos(this.#tiempos);
    estadistica.tiempoPromedio = Cronometro.calcularPromedio(this.#tiempos);

    return estadistica;
  }
}

//CREO EL CRONOMETRO CON SUS ATRIBUTOS Y METODOS
class Cronometro {
  #tiempo;          //guardo el tiempo actual
  #temporizador;    //llamo al setIntervalo
  #contedor;

  constructor() {
    this.#tiempo = 0;
    this.#temporizador = null;
  }

  getTiempo() {
    return this.#tiempo;
  }

  iniciar() {
    if (!this.#temporizador) {        //evito multiples intervalos
      this.#temporizador = setInterval(() => {
        this.#tiempo++;
        if(this.#contedor){
          this.#contedor.textContent = Cronometro.formatearHora(this.#tiempo);
        }
      }, 10);   //Actualiza en centesimas de segundo
    }
  }

  parar() {
    if (this.#temporizador) {
      clearInterval(this.#temporizador);
      this.#temporizador = null;
    }
  }

  reiniciar() {
    this.parar();
    this.#tiempo = 0;
  }

  mostrarCronometro(contenedor){
    this.#contedor = contenedor;
  }

  static formatearHora(centesimas) {
    const min = Math.floor(centesimas / 6000); // 6000 centésimas = 1 minuto
    const seg = Math.floor((centesimas % 6000) / 100); // 100 centésimas = 1 segundo
    const cent = centesimas % 100; // Centésimas restantes
    
    return `${min.toString().padStart(2, "0")}:${seg
      .toString()
      .padStart(2, "0")}.${cent.toString().padStart(2, "0")}`;
  }

  static sumarTiempos(lista) {
    return lista.reduce((resul, t) => resul + t, 0);
  }

  static calcularPromedio(lista) {
    const tiempoTotal = this.sumarTiempos(lista);
    const cantTiempos = lista.length;
    return cantTiempos > 0 ? tiempoTotal / cantTiempos : 0;
  }
}

Interfaz.init(2);
