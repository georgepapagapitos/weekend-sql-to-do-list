$(onReady);

function onReady() {
  getTodoList();
  $('#btn-add').on('click', postTodo);
  $('#todo-area').on('change', 'input[name=checkbox]', onCheck);
}

function getTodoList() {
  $.ajax({
    method: 'GET',
    url: '/todoList',
  })
    .then(function (response) {
      $('#todo-area').empty();
      console.log('GET response', response);
      for (item of response) {
        $('#todo-area').append(`
          <div class="todo-item">
            <input type="checkbox" name="checkbox" id="${item.id}"data-id="${
          item.id
        }" 
            ${item.isComplete ? 'checked' : ''}>
            <label class="strikethrough" for=${item.id}>${item.todo}</label>
            <button class="${
              item.isComplete ? '' : 'hidden'
            } btn-delete" type="button" data-id="${item.id}">X</button>
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

function undoTodo(todoId) {
  console.log('undo todoId', todoId);
  $.ajax({
    method: 'PUT',
    url: `/todoList/undo/${todoId}`,
    data: {
      todoId,
    },
  })
    .then(function (response) {
      console.log('UNDO');
    })
    .catch((error) => {
      console.log('UNDO ERROR', error);
    });
}

// function deleteTodo(todoId) {
//   console.log('todoId', todoId);
//   $.ajax({
//     method: 'DELETE',
//     url: `/todoList/${todoId}`,
//   })
//     .then(function (response) {
//       console.log('delete complete');
//       getTodoList();
//     })
//     .catch(function (error) {
//       console.log('DELETE error', error);
//     });
// }

function onCheck() {
  let todoId = $(this).data('id');
  console.log('checked id', todoId);
  if ($(this).is(':checked')) {
    completeTodo(todoId);
  } else {
    undoTodo(todoId);
  }
  getTodoList();
}
