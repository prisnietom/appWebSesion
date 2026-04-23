//Usuario único
/*
const username = "Pris";
const password = "1239";

function login() {
	let usuario = document.getElementById("inputUsername").value;
	let contrasena = document.getElementById("inputPassword").value;

	if (usuario == username && contrasena == password) {
		window.location = "home.html";
		window.alert("Acceso concedido");
	} else {
		alert("Acceso incorrecto");
	}
}
*/
const users = [
	{ username: "Pris", password: "1239" },
	{ username: "chris", password: "0945" },
	{ username: "jony", password: "6473" },
];

// FUNCIÓN Inicio de Sesión, búsqueda de usuario y contraseña
// ============================

function login() {
	let usuario = document.getElementById("inputUsername").value;
	let contrasena = document.getElementById("inputPassword").value;

	//buscar el usuario dentro del arreglo, Validación usando método
	let usuarioEncontrar = users.find(
		(user) => user.username === usuario && user.password === contrasena,
	);

	if (usuarioEncontrar) {
		localStorage.setItem("usuarioActivo", usuarioEncontrar.username);
		window.location = "home.html";
		window.alert("Acceso concedido");
	} else {
		window.alert("Credenciales incorrectas");
	}
}

let registros = []; // arreglo dinámico de registros

//Función agregar registros
function addTask(callback) {
	let id = document.getElementById("idReg").value;
	let nameReg = document.getElementById("nameReg").value;
	let primerApReg = document.getElementById("primerApReg").value;
	let segApReg = document.getElementById("segApReg").value;
	let startDate = document.getElementById("startDate").value;
	let numTel = document.getElementById("numTel").value;
	let pet = document.getElementById("pet").value;
	let razaPet = document.getElementById("razaPet").value;
	let namePet = document.getElementById("namePet").value;
	let comments = document.getElementById("comments").value;

	//  VALIDAR CAMPOS VACÍOS
	if (
		!id ||
		!nameReg ||
		!primerApReg ||
		!segApReg ||
		!startDate ||
		!pet ||
		!numTel ||
		!namePet ||
		!razaPet
	) {
		alert("Todos los campos son obligatorios");
		return;
	}

	// VALIDAR TIPO NUMÉRICO

	if (isNaN(id) || isNaN(numTel)) {
		alert("ID y Número teléfono deben ser numéricos");
		return;
	}

	id = Number(id);
	numTel = Number(numTel);

	// VALIDAR ID REPETIDO (CICLO FOR)

	let idRepetido = false;

	for (let i = 0; i < registros.length; i++) {
		if (registros[i].id === id) {
			idRepetido = true;
			break; // Detiene el ciclo si encuentra coincidencia
		}
	}

	if (idRepetido) {
		alert("El ID ya existe. No se puede repetir.");
		return;
	}

	// CONFIRMAR ANTES DE GUARDAR

	let confirmar = confirm("¿Deseas guardar este registro?");

	if (!confirmar) {
		alert("Registro cancelado");
		return;
	} else {
		alert("Datos guardados");
	}

	// CREAR OBJETO

	let nuevoCliente = {
		id: id,
		nameReg,
		primerApReg,
		segApReg,
		startDate,
		numTel: numTel,
		pet,
		razaPet,
		namePet,
		comments,
		status: "Nuevo",
	};

	registros.push(nuevoCliente);

	renderTable(); //llamado a la función, muestra datos en tabla

	callback(); // limpia formulario
}

//función para mostrar datos guardados
function renderTable() {
	let table = document.getElementById("recordTable");
	table.innerHTML = "";

	for (let record of registros) {
		let row = `
            <tr>
                <td>${record.id}</td>
                <td>${record.nameReg}</td>
                <td>${record.primerApReg}</td>
                <td>${record.startDate}</td>
                <td>${record.pet}</td>
                <td>${record.namePet}</td>
                <td>${record.status}</td>
            </tr>
        `;

		table.innerHTML += row;
	}
}

function clearForm() {
	document.getElementById("idReg").value = "";
	document.getElementById("nameReg").value = "";
	document.getElementById("primerApReg").value = "";
	document.getElementById("segApReg").value = "";
	document.getElementById("startDate").value = "";
	document.getElementById("numTel").value = "";
	document.getElementById("pet").value = "";
	document.getElementById("razaPet").value = "";
	document.getElementById("namePet").value = "";
	document.getElementById("comments").value = "";
}
