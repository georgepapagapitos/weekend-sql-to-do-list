$(onReady);

function onReady() {
  getTodoList();
  $('#btn-add').on('click', postTodo);
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
            <td>${item.todo}</td>
            <td>${item.isComplete}</td>
            <td><button>Mark Complete</button></td>
            <td><button>Delete</button></td>
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
