'use strict';

var express = require('express');
var router = express.Router();
const todos = require('../models/todos');



router.get('/', function (req, res) {
	return res.status(200).send(todos.listPeople());
});

router.get('/:name/tasks', function (req, res) {
	const {name} = req.params;
	const {status} = req.query;
	const check = todos.list(name);

	if (!check) return res.sendStatus(404);

	if (status) {
		let aFiltrar = todos.list(name);
		let filtrado;

		status === 'complete'
			? (filtrado = aFiltrar.filter((el) => el.complete === true))
			: (filtrado = aFiltrar.filter((el) => el.complete === false));

		/* 		if (status === 'complete') {
			filtrado = aFiltrar.filter((el) => el.complete === true);
		} else {
			filtrado = aFiltrar.filter((el) => el.complete === false);
		} */

		return res.status(200).send(filtrado);
	}

	return res.status(200).send(check);
});

router.post('/:name/tasks', function (req, res) {
	const {name} = req.params;
	let check = true;
	/* 	let name = req.params.name;
	let task = req.body;
	todos.add(name, task);
	let ss = Object.keys(task);
	if (ss.length == 2) {
		if (!task.complete) {
			task = {...task, complete: false};
			return res.status(201).json(task);
		}
		return res.status(201).json(task);
	} else res.sendStatus(400);
});
 */
	Object.keys(req.body).forEach((el) => {
		if (el !== 'content' && el !== 'complete') return (check = false);
	});
	if (check) return res.status(201).send(todos.add(name, req.body));
	else return res.sendStatus(400);
});

router.put('/:name/tasks/:index', (req, res) => {
	const {name, index} = req.params;
	todos.complete(name, index);

	return res.send('condori besito');
});

router.delete('/:name/tasks/:index', (req, res) => {
	const {name, index} = req.params;
	todos.remove(name, Number(index));
	return res.status(204).send('condori besito');
});
module.exports = router;
