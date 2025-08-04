//lista de participantes 
let participantes = [];
let asignaciones = null;
let ordenParticipantes = [];
let indiceActual = 0;
let timeoutId = null; //gestiona el temp

// Agregar un participante
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }

         if (!participantes.includes(nombre)) {
            participantes.push(nombre);
            actualizarLista();
            input.value = '';
    } else {
        alert('Este nombre ya está en la lista.');
     }
 }

 //mostrar la lista
 function actualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    participantes.forEach((nombre) => {
        const li = document.createElement('li');
        li.textContent = nombre;
        lista.appendChild(li);
      });
}

//asignaciones
function generarAsignaciones() { 
     if (participantes.length < 2) {
        alert('Se necesitan al menos 2 participantes.');
        return false;
    }

    let receptores;
    do {
        receptores = mezclar([...participantes]);
    } while (receptores.some((r, i) => r === participantes[i]));

    asignaciones = {};
    for (let i = 0; i < participantes.length; i++) {
        asignaciones[participantes[i]] = receptores[i];
    }
        
//aleatorios
    ordenParticipantes = [...participantes];
    mezclar(ordenParticipantes);
    indiceActual = 0;
    return true;
}

//shuffle 
function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// siguiente amigo en pantalla, continuidad
function mostrarAmigo() {
     if (indiceActual >= ordenParticipantes.length) {
        document.getElementById('resultado').textContent = '¡Fin del sorteo!';
        return;
    }
    const participante = ordenParticipantes[indiceActual];
    const amigoSecreto = asignaciones[participante];

    //mostrar amigo
    document.getElementById('resultado').textContent = `El amigo secreto de ${participante} es: ${amigoSecreto}`;

    //limpiar temp previo
    if (timeoutId) clearTimeout(timeoutId);

    //borrado temporizado
     timeoutId = setTimeout(() => {
        document.getElementById('resultado').textContent = '';
     }, 10000);
 }
 //funcion avanzar sigte participante     
function siguienteParticipante() {
    //cancelar tiempo fuera estando activo
     if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    //avanzar y mostrar
    if (indiceActual < ordenParticipantes.length - 1) {
        indiceActual++;
        mostrarAmigo();
     } else {
         document.getElementById('resultado').textContent = '¡Todos han visto a su amigo secreto!';
         }
    }
//funcion para mostra al amigo
function sortear() {
    if (generarAsignaciones()) {
        mostrarAmigo();
    }
}




