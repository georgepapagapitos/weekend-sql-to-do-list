$(onReady);

function onReady() {
  getTodoList();
  $('#btn-add').on('click', postTodo);
  $('#todo-list').on('click', '.todo-item', isComplete);
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
        <li class="todo-item ${
          item.isComplete != false ? 'complete' : ''
        }" data-id="${item.id}">
          ${item.todo}
        </li>
        `);
      }
    })
    .catch(function (error) {
      console.log('GET error', error);
    });
}

function postTodo(event) {
  event.preventDefault();
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

function completeTodo(todoId) {
  $.ajax({
    method: 'PUT',
    url: `/todoList/${todoId}`,
    data: {
      todoId,
    },
  })
    .then(function (response) {
      console.log('PUT response', response);
      getTodoList();
    })
    .catch(function (error) {
      console.log('PUT error', error);
    });
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

function isComplete() {
  let todoId = $(this).data('id');
  $.ajax({
    method: 'GET',
    url: `/todoList/isComplete/${todoId}`,
  })
    .then(function (response) {
      console.log('iscomplete response', response);
      if (response) {
        deleteTodo(todoId);
      } else {
        completeTodo(todoId);
      }
    })
    .catch(function (error) {
      console.log('is complete error', error);
    });
}
