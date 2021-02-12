$(onReady);

function onReady() {
  getTodoList();
  $('#btn-add').on('click', postTodo);
  $('#todo-list').on('click', '.todo-item', onComplete);
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
        $('#todo-list').append(`
          <tr>
            <td class="todo-item" data-id="${item.id}">${item.todo}</td>
            <td><button class="btn-delete" data-delete="${item.id}">Delete</button></td>
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
  let todoItem = $(this).data('id');
  $(this).addClass('complete');
  completeTodo(todoItem);
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
  deleteTodo($(this).data('delete'));
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
