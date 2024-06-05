//es un array que almacenará los objeto
let listaEmpleados = [];s de tipo objEmpleado.

// es un objeto que representa la información de un empleado (id, nombre, puesto).
const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

// es una bandera que indica si se está editando un empleado o creando uno nuevo.
let editando = false;

//Se seleccionan los elementos del formulario (nombre, puesto, botón de agregar) y se agrega un evento de "submit" al formulario.

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');
formulario.addEventListener('submit', validarFormulario);


//La función validarFormulario() se ejecuta cuando se envía el formulario.
function validarFormulario(e) {
    e.preventDefault();

    //Verifica si los campos de nombre y puesto están vacíos. Si es así, muestra una alerta.
    if(nombreInput.value === '' || puestoInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    //Si se está editando, llama a la función editarEmpleado(). Si no, llama a la función agregarEmpleado().
    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

//La función agregarEmpleado() crea un nuevo objeto objEmpleado con un ID único (basado en la fecha actual) y los valores de los campos del formulario.
function agregarEmpleado() {

    //Agrega el nuevo objeto a la listaEmpleados y llama a la función mostrarEmpleados() para actualizar la visualización.
    listaEmpleados.push({...objEmpleado});
    mostrarEmpleados();

    //Luego, limpia el formulario y el objeto objEmpleado.
    formulario.reset();
    limpiarObjeto();
}

////limpiarObjeto(): limpia los valores del objeto objEmpleado.
function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

//La función mostrarEmpleados() primero limpia el contenedor de empleados (limpiarHTML()).
function mostrarEmpleados() {
    limpiarHTML();

    //selecciona en el docmuento html el contenedor de los empleados
    const divEmpleados = document.querySelector('.div-empleados');
    
    //Luego, recorre la listaEmpleados y crea un elemento <p> para cada empleado, mostrando su información (ID, nombre, puesto).
    listaEmpleados.forEach(empleado => {
        const {id, nombre, puesto} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `Id: ${id} - Nombre: ${nombre} - Puesto: ${puesto} - `;
        parrafo.dataset.id = id;

        //Agrega dos botones ("Editar" y "Eliminar") al elemento <p> y los conecta a las funciones correspondientes (cargarEmpleado() y eliminarEmpleado()).
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        //Finalmente, agrega el elemento <p> y un <hr> al contenedor de empleados.
        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

////La función cargarEmpleado() toma un objeto empleado y llena los campos del formulario con sus valores.
function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    //También cambia el texto del botón de envío del formulario a "Actualizar" y establece la bandera editando en true.
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

//La función editarEmpleado() actualiza los valores del objeto objEmpleado con los nuevos valores del formulario.
function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    //Luego, recorre la listaEmpleados y actualiza el empleado correspondiente.
    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;

        }

    });

    //Finalmente, limpia el HTML y vuelve a mostrar la lista de empleados, limpia el formulario y cambia el texto del botón de envío a "Agregar".
    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

//La función eliminarEmpleado() toma el ID del empleado a eliminar y filtra la listaEmpleados para eliminar el empleado correspondiente.
function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    //Luego, llama a limpiarHTML() y mostrarEmpleados() para actualizar la visualización.
    limpiarHTML();
    mostrarEmpleados();
}

//limpiarHTML(): elimina todos los elementos hijos del contenedor de empleados.
function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}