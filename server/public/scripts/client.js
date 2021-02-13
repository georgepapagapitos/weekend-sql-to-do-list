$(onReady);

function onReady() {
  getTodoList();
  $('#btn-add').on('click', postTodo);
  $('#todo-area').on('change', 'input[name=checkbox]', onCheck);
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
        $('#todo-area').append(`
       <div class="todo-item">
        <input type="checkbox" name="checkbox" id="${item.id}"data-id="${
          item.id
        }" ${item.isComplete ? 'checked' : ''}>
        <label class="strikethrough" for=${item.id}>${item.todo}</label>
       </div>
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
    $('#todo-area').empty();
    getTodoList();
  });
}

function completeTodo(todoId) {
  console.log('complete todoId', todoId);
  $.ajax({
    method: 'PUT',
    url: `/todoList/complete/${todoId}`,
    data: {
      todoId,
    },
  })
    .then(function (response) {
      console.log('completed to do');
    })
    .catch(function (error) {
      console.log('PUT error', error);
    });
}

function redoTodo(todoId) {
  console.log('redo todoId', todoId);
  $.ajax({
    method: 'PUT',
    url: `/todoList/redo/${todoId}`,
    data: {
      todoId,
    },
  })
    .then(function (response) {
      console.log('REDO');
    })
    .catch((error) => {
      console.log('REDO ERROR', error);
    });
}

function deleteTodo(todoId) {
  console.log('todoId', todoId);
  $.ajax({
    method: 'DELETE',
    url: `/todoList/${todoId}`,
  })
    .then(function (response) {
      console.log('delete complete');
      getTodoList();
    })
    .catch(function (error) {
      console.log('DELETE error', error);
    });
}

function onCheck() {
  let todoId = $(this).data('id');
  console.log('checked id', todoId);
  if ($(this).is(':checked')) {
    completeTodo(todoId);
  } else {
    redoTodo(todoId);
  }
}
