$(document).ready(onReady);

function onReady() {
  getTodoList();
  // $('#btn-add').on('click', postTodo);
}

function getTodoList() {
  $.ajax({
    type: 'GET',
    url: '/todoList',
  })
    .then(function (response) {
      console.log('GET response');
    })
    .catch(function (error) {
      console.log('GET error', error);
    });
}
