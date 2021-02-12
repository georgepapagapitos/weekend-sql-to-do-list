$(onReady);

function onReady() {
  getTodoList();
  $('#btn-add').on('click', postTodo);
  $('#todo-list').on('click', '.btn-complete', onComplete);
  $('#todo-list').on('click', '.btn-delete', onDelete);
}

function getTodoList() {
  $('#todo-list').empty();
  $.ajax({
    method: 'GET',
    url: '/todoList',
  })
    .then(function (response) {
      console.log('GET response', response);
      for (item of response) {
        if (item.isComplete != true) {
          item.isComplete = false;
        }
        $('#todo-list').append(`
          <tr class="todo-row">
            <td>${item.todo}</td>
            <td>${item.isComplete}</td>
            <td><button class="btn-complete" data-id="${item.id}">Mark Complete</button></td>
            <td><button class="btn-delete" data-id="${item.id}">Delete</button></td>
          </tr>
        `);
      }
    })
    .catch(function (error) {
      console.log('GET error', error);
    });
}

function postTodo() {
  $.ajax({
    method: 'POST',
    url: '/todoList',
    data: {
      todo: $('#todo-in').val(),
    },
  }).then(function (response) {
    $('#todo-in').val('');
    getTodoList();
  });
}

function onComplete() {
  completeTodo($(this).data('id'));
}

function completeTodo(todoId) {
  $.ajax({
    method: 'PUT',
    url: `/todoList/${todoId}`,
    data: {
      todoId,
    },
  })
    .then(function (response) {
      getTodoList();
    })
    .catch(function (error) {
      console.log('PUT error', error);
    });
}

function onDelete() {
  deleteTodo($(this).data('id'));
}

function deleteTodo(todoId) {
  console.log('todoId', todoId);
  $.ajax({
    method: 'DELETE',
    url: `/todoList/${todoId}`,
  })
    .then(function (response) {
      getTodoList();
    })
    .catch(function (error) {
      console.log('DELETE error', error);
    });
}
