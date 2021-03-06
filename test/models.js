/* eslint-disable no-unused-expressions */

var expect = require('chai').expect;

// importo la lista de 'to do's'
var Todos = require('../models/todos');
describe('To do model', function() {

  // cada uno de los test arranca con una nueva lista (todos.js)
  beforeEach(function() {
    Todos.reset();
  });

  describe('`listPeople` y `add`', function() {
    it('inicialmente devuelve un arreglo vacío', function() {
      expect(Todos.listPeople()).to.eql([]);
    });

    it('agrega personas a la lista una vez que se les asignan tareas', function() {
      Todos.add('emi', { content: 'limpiar su cuarto' });
      expect(Todos.listPeople()).to.eql(['emi']);
    });

    it('maneja distintas personas con distintas tareas', function(){
      Todos.add('toni', { content: 'limpiar su cuarto' });
      Todos.add('toni', { content: 'comprar pan' });
      expect(Todos.listPeople()).to.eql(['toni']);
      Todos.add('franco', { content: 'hacer empanadas' });
      expect(Todos.listPeople()).to.eql(['toni', 'franco']);
    });
  });

  describe('`add` y `list`', function() {
    it('recuerda quien hace que', function() {
      Todos.add('martin', { content: 'limpiar el baño' });
      expect(Todos.list('martin')).to.have.length(1);
      Todos.add('emi', { content: 'comprar chocolate' });
      expect(Todos.list('emi')).to.have.length(1);
      Todos.add('emi', { content: 'limpiar la cocina' });
      expect(Todos.list('emi')).to.have.length(2);
    });
  });

  describe('`complete`', function() {
    it('la propiedad `complete` es un booleano que ponemos como `false`\
      cada vez que ingresa una nueva tarea', function() {
      Todos.add('franco', { content: 'bañarse' });
      expect(Todos.list('franco')[0].complete).to.be.false;
    });

    it('respeta un estado pre establecido para la tarea', function() {
      Todos.add('toni', { content: 'hacer cafe', complete: true });
      Todos.add('toni', { content: 'dejar de fumar', complete: false });
      expect(Todos.list('toni')[0].complete).to.be.true;
      expect(Todos.list('toni')[1].complete).to.be.false;
    });

    it("el método `complete` cambia el estado de la tarea a completado (`true`)", function() {
      Todos.add('franco', { content: 'ir al chino' });
      Todos.add('franco', { content: 'ir al kiosko' });
      Todos.add('franco', { content: 'limpiar la maquinita' });
      Todos.complete('franco', 1);
      expect(Todos.list('franco')[0].complete).to.be.false;
      expect(Todos.list('franco')[1].complete).to.be.true;
      expect(Todos.list('franco')[2].complete).to.be.false;
    });
  });

  describe('`remove`', function() {
    it('remueve una tarea de una persona por indice', function() {
      // seteo un grupo de tareas
      for (var i = 0; i < 10; i++) Todos.add('emi', { content: 'tarea ' + i });
      expect(Todos.list('emi').length).to.equal(10);
      // uso el metodo `remove`
      Todos.remove('emi', 5);
      // miro el estado actual
      expect(Todos.list('emi').length).to.equal(9);
      expect(Todos.list('emi')[4].content).to.equal('tarea 4'); // antes del 5 todo esta igual
      expect(Todos.list('emi')[5].content).to.equal('tarea 6'); // 5 quedo borrado
      expect(Todos.list('emi')[6].content).to.equal('tarea 7'); // el resto se movió un lugar
    });
  });
});
