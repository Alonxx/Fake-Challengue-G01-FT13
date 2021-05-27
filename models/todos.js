'use strict';

var tasks = {}; // acá vamos a guardar nuestras personas y tareas
// PISTA: Taks es un objeto donde cada propiedad (nombre de una persona)
// tiene asociada como valor un array de to-dos

module.exports = {
	reset: function () {
		tasks = {}; // esta función ya esta armada :D
	},
	// ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
	listPeople: function () {
		// devuelve un arreglo de personas con tareas
		return Object.keys(tasks);
	},
	add: function (name, task) {
		// guarda una tarea para una persona en particular

		if (!task.complete) {
			task.complete = false;
		}
		if (!tasks[name]) {
			tasks[name] = [task];
		} else {
			tasks[name].push(task);
		}
		return task;
	},

	list: function (name) {
		if (tasks[name]) return tasks[name];
		else {
			return false;
		}
	},
	complete: function (name, index) {
		tasks[name][index].complete = true;
	},
	remove: function (name, index) {
		tasks[name] = tasks[name].filter((el, i) => i !== index);

		//tasks[name].splice(index, 1);
	},

	// etc.
};
