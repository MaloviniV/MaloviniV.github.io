//Recupero los elementos
let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let telefono = document.getElementById("telefono");
let servicio = document.getElementById("servicio");
let mensaje = document.getElementById("mensaje");
let ltaErrores = document.getElementById("ltaErrores");
let confEnvio = document.getElementById("confEnvio");

function validarForm(){
  ltaErrores.innerHTML = "";  //seteo la lista de errores a vacio
   //remuevo la clase error del input
  nombre.classList.remove("error");
  email.classList.remove("error");
  telefono.classList.remove("error");
  servicio.classList.remove("error");
  mensaje.classList.remove("error");
// Creo una lista de errores y los patrones de validacion
  let errores = [];
  const patronTel = /^[1-9]\d{9}$/;
  const patronEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //Recupero los valores de entrada
  let txtNombre = nombre.value.trim();  //TRIM? quita los espacios en blanco al inicio y final
  let txtEmail = email.value;
  let txtTel = telefono.value;
  let selecServicio = servicio.value;
  let txtArea = mensaje.value.trim();
//Valido todas las entradas
  if (txtNombre.length == 0) {      //chequeo el input nombre
    nombre.classList.add("error");
    errores.push("Debe escribir su nombre");
  }
  
  if (!patronEmail.test(txtEmail)) {  //Chequeo el Email
    email.classList.add("error");
    errores.push("Ingrese un E-Mail valido");
  }
  
  if (!patronTel.test(txtTel)) {  //Chequeo el Email
    telefono.classList.add("error");
    errores.push(("Ingrese un telefono valido"));
  }

  if (selecServicio === "") {    //Chequeo Servicio
    servicio.classList.add("error");
    errores.push("Seleccione un servicio");
  }

  if (txtArea === "") {
    mensaje.classList.add("error");
    errores.push("Ingrese una descripción");
  }

  for (let x of errores) {  //cargo la lista de errores para mostrar
    let item = document.createElement("li");  //creo el elemento li
    item.innerText = x; //le cargo el error
    ltaErrores.appendChild(item); //ubico el elmento creado en el html
  }
//controlo si el formulario esta correcto
  if(errores.length == 0){
    document.getElementsByClassName("form")[0].style.display="none";  //oculto el formulario
    document.querySelector(".formulario > h2").innerText = `¡Hola ${txtNombre}! Gracias por confiar en nosotros!`;
    document.getElementById("confEnvio").innerText = "Te responderemos a la brevedad.\n🙋‍♂️";
    document.forms[0].reset;
    return false; //formlario OK, retorno falso para no enviar el formulario
  }else{
    return false; //hay un error en el formulario, cancelo envio
  }
}
