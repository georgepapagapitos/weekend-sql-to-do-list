$(onReady);

function onReady() {
  getTodoList();
  // $('#btn-add').on('click', postTodo);
}

function getTodoList() {
  $.ajax({
    method: 'GET',
    url: '/todoList',
  })
    .then(function (response) {
      console.log('GET response', response);
      for (item of response) {
        $('#todo-list').append(`
          <li>
            ${item.todo}
            <button>Complete</button>
            <button>Delete</button>
          </li>
        `);
      }
    })
    .catch(function (error) {
      console.log('GET error', error);
    });
}
