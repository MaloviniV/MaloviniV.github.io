//CREO BOTONES, maneja vistas importantes y INICIALIZO LA APLICACION
class Interfaz {      

  static init(preguntas=10) {
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
    this.btnRanking.addEventListener("click", async() => {
      await Data.cargarRanking();
      Ranking.interfazRanking();
      this.cambiarVista(this.ranking);
    });
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
  
  static async cargarPaises() {    
    const URL_API = "https://restcountries.com/v3.1/all";
    
    try {
      const answer = await fetch(URL_API);    //solicito a la api
      const data = await answer.json();
      this.listaPaises = data;   //envio los datos a la API como respuesta
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
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

//SOLICITO LOS DATOS AL SERVIDOR Y LOS GUARDO EN VARIABLE RANKING
  static async cargarRanking() {
    try {
      const respuesta = await fetch(`/ranking.txt`);    //Solicito los datos al servidor
      if(!respuesta.ok){
        console.log(`Archivo no encontrado, creando uno nuevo.....CLIENTE`);   //Validacion hecha en el servidor NO DEBERIA EJECUTARSE
        await this.guardarRanking();
        this.ranking = [];
        console.log("Archivo creado correctamente desde CLIENTE");
      }else{
        this.ranking = await respuesta.json();    //Guardo los datos en formato JSON
        console.log(`Datos del servidor recuperados correctamente`);
      }
    } catch (error) {
      console.error(`Error al cargar el ranking desde CLIENTE: ${error.message}`);
    }
  }

  static async guardarRanking(nuevoRanking=[]){
    try {
      const respuesta = await fetch("/ranking.txt",{
        method: "POST",
        headers: {"Content-Type": "application/json"},        
        body: JSON.stringify(nuevoRanking)
      });
//lanzo un error si laa respuesta no es 200
      if (!respuesta.ok) {
        throw new Error(`Error al actualizar el ranking desde CLIENTE: ${respuesta.status} ${respuesta.statusText}`);
      }
      
      console.log(`Ranking actualizado correctamente desde CLIENTE`);
    } catch (error) {
      console.error(`Error al actualizar el ranking desde CLIENTE: ${error}`);      
    }
  }
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
  contTitulo.className = "estadistica";
  contTitulo.textContent = "Estadisticas";
  fragmento.appendChild(contTitulo);

//Cargo las estadisticas
  const contEstadisticas = document.createElement("div");
  contEstadisticas.className = "estadistica";
  contEstadisticas.innerHTML = `<span><span class="label">Puntuación final:</span> ${estadisticas.puntos}</span>
                                <span><span class="label">Preguntas correctas:</span> ${estadisticas.correctas}</span>
                                <span><span class="label">Preguntas Incorrectas:</span> ${estadisticas.incorrectas}</span>
                                <span><span class="label">Tiempo de la partida:</span> ${Cronometro.formatearHora(estadisticas.tiempoPartida)}</span>
                                <span><span class="label">Tiempo promedio:</span> ${(estadisticas.tiempoPromedio / 100).toFixed(4)} seg</span>
                                `;
  fragmento.appendChild(contEstadisticas);
//Cargo el boton para ir a inicio
  fragmento.appendChild(Interfaz.crearBoton("INICIO", ()=>{
    Interfaz.cambiarVista(document.querySelector(".inicio"))
  }));

  contenedorJuego.appendChild(fragmento);

  Ranking.actualizarRanking(estadisticas);

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

    estadistica.nombre = this.nombre;
    estadistica.puntos = this.#puntaje;
    estadistica.correctas = this.#correctas;
    estadistica.incorrectas = this.#tiempos.length - this.#correctas;
    estadistica.tiempoPartida = Cronometro.sumarTiempos(this.#tiempos);
    estadistica.tiempoPromedio = Cronometro.calcularPromedio(this.#tiempos);

    return estadistica;
  }
}

//MANEJO EL RANKING
class Ranking {
  static interfazRanking(){     //GENERO LA INTERFAZ DEL RANKING
    const ranking = document.querySelector(".ranking");

    ranking.innerHTML = this.#crearTablaHTML();

    ranking.appendChild(Interfaz.crearBoton("INICIO", ()=>{
      Interfaz.cambiarVista(document.querySelector(".inicio"))
    }));
  }

  static #crearTablaHTML(){     //Creo la tabla HTML
    const ranking = Data.ranking;
    console.log(ranking);
    
    const filas = ranking.map((partida, index)=>{
      return `<tr>
                <td>${index+1}</td>
                <td>${partida.nombre}</td>
                <td>${partida.puntos}</td>
                <td>${partida.correctas}</td>
                <td>${partida.incorrectas}</td>
                <td>${Cronometro.formatearHora(partida.tiempoPartida)}</td>
              </tr>`;
    }).join("");

    return `<h2>RANKING DE PARTIDAS</h2>
            <div class="tabla">
              <table>
                <thead>
                  <tr>
                    <th>POSICION</th>
                    <th>NOMBRE</th>
                    <th>PUNTAJE</th>
                    <th>CORRECTAS</th>
                    <th>INCORRECTAS</th>
                    <th>TIEMPO</th>
                  </tr>
                </thead>
                <tbody>
                  ${filas}
                </tbody>
              </table>
            </div>
    `;
  }

  static actualizarRanking(estadisticas){     //ACTUALIZO EL RANKING
    let ranking = Data.ranking;
    ranking.push(estadisticas);   //Agrego las nuevas estadisticas
    ranking = this.#ordenarRanking(ranking);  //Ordeno el ranking
    ranking.slice(0,20);    //Recorto la lista a los primeros 20
    
    Data.guardarRanking(ranking);
  }

  static #ordenarRanking(lista){        //ORDENO EL RANKING
    return lista.sort((a,b)=>{
      if(a.puntos !== b.puntos){
        return b.puntos - a.puntos;
      } else if(b.correctas !== a.correctas){
        return b.correctas - a.correctas;
      } else {
        return b.tiempoPartida - a.tiempoPartida;
      }
    });
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

Interfaz.init();
