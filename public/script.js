class Interfaz {         //Recupera los botones, maneja vistas importantes y agrega listeners
  static init() {       //Inicializa elementos vistas importantes
    this.inicio = document.querySelector(".inicio");
    this.ranking = document.querySelector(".ranking");
    this.juego = document.querySelector(".juego");
    this.nombre = document.getElementById("nombre");
    this.btnJugar = document.getElementById("btnJugar");
    this.btnRanking = document.getElementById("btnRanking");
    this.btnVolver = document.getElementById("btnVolver");
    
    this.btnJugar.addEventListener("click", (async () => {
      const txtNombre = this.nombre.value.trim(); // Elimina los espacios en blanco al inicio y al final del nombre
      if (!txtNombre) {
        this.highlightError(this.nombre);
        this.nombre.focus();
        return;
      }

      await Data.cargarDatos();
      Juego.iniciarJuego(10,txtNombre);
      this.viewPlay();
    }));
    this.btnRanking.addEventListener("click", () => this.viewRanking());
    this.btnVolver.addEventListener("click", () => this.return());
  }
  
  static viewPlay() {        //Muestra la vista para jugar
    this.toggleView(this.inicio, this.juego);
  }
  
  static viewRanking() {      //Muestra la vista ranking
    this.toggleView(this.inicio, this.ranking);
  }
  
  static return() {       //Maneja el boton volver
    this.toggleView(this.ranking, this.inicio);
  }

  static highlightError(inputElement) {       //Resalta error por 2 segundos ( Coloca clase CSS "error" )
    inputElement.classList.add("error");
    setTimeout(() => {
      inputElement.classList.remove("error");
    }, 2000); // El resaltado desaparece después de 2 segundos
  }
  
  static toggleView(...elements) {  // Toggle alterna la clase ocultar  (saca y pone la clase CSS "ocultar")
    elements.forEach((element) => {
      element.classList.toggle("ocultar");
    });
  }
}
//Clase para recuperar datos del servidor
class Data {      //VALIDAR DATOS DE LA RESP "capital","flag","borders"(CARGAR SOLO DATOS NECESARIOS)
  static URL_API = "/app/all";
  static listaPaises = []; 
  
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
}

class Juego {     //FALTA CARGAR RANKING
  static iniciarJuego(cantPreguntas, nombreJugador){
    const jugador = Jugador.crearJugador(nombreJugador);
    const listaPreguntas = this.cargarPreguntas(cantPreguntas);
    const ranking = [];           //Lista de estadisticas de los jugadores

    
  }
  //CARGO PREGUNTAS
  static cargarPreguntas(numPreguntas){
    const preguntas = [];
    const tiposPreguntas = ["capital","flag","borders"];
    
    for (let index = 0; index < numPreguntas; index++) {
      let indice = index%tiposPreguntas.length;     //asigno el indice siguiente de forma ciclica entre 0 y 3      
      const nuevaPregunta = Pregunta.crearPregunta(tiposPreguntas[indice]);
      
      //controlo que la pregunta no se encuentre en la lista de preguntas
      if (preguntas.some((preg) => preg.type===nuevaPregunta.type && preg.answer===nuevaPregunta.answer)) {
        index--;
      } else {
        preguntas.push(nuevaPregunta);      
      }
    } 
    //Devuelvo la lista de preguntas
    return preguntas;
  }
}

class Pregunta {
  
  static crearPregunta(tipo){
    let pregunta;
    const cantOpciones = 4;
    const setOpciones = new Set();
    let respuesta;
    let puntos;
    //Cargo la pregunta, LA RESPUESTA, puntos
    while (!pregunta) {
      let pais = this.recuperarPaisAleatorio();
      console.log(pais);
      switch (tipo) {
        case "capital":
          if(pais?.capital){
            pregunta = `¿Cuál es el país de la capital ${pais.capital[0]}?`
            respuesta = pais.name.common;
            puntos = 3;
          }
          break;

        case "flag":
          if(pais?.flags?.svg){
            pregunta = `
                        <p>¿Qué país esta representado por la siguiente bandera?</p>
                        <img src="${pais.flags.svg}">
                      `
            respuesta = pais.name.common;
            puntos = 5;
          }
          break;

        case "borders":
          if(pais?.borders){
            pregunta = `¿¿Cuántos países limítrofes tiene ${pais.name.common}?`
            respuesta = pais.borders.length;
            puntos = 3;
          }
          break;
          
        default:
        console.error("Tipo de pregunta inexistente");
        
        break;
      }
    }
    setOpciones.add(respuesta);
    console.log("pregunta cargada y respuesta cargada");
//CARGAR OPCIONES
    while (setOpciones.size<=cantOpciones) {
      const pais = this.recuperarPaisAleatorio();
      setOpciones.add(pais.name.common);
    }

  }
  
  static recuperarPaisAleatorio(){
    const paises = this.getListaPaises();
    const random = Math.floor(Math.random() * paises.length); //Numero aleatorio
    return paises[random];
  }
  
  static getListaPaises() {
    return Data.getPaises();
  }
}


class Jugador {
  static crearJugador(nombre){
    let puntaje = 0
    let correctas = 0;    //Respuestas correctas
    let tiempo = 0;
    const tiemposRegistrados = [];    //Guarda el tiempo de cada respuesta
  }
}

Interfaz.init();