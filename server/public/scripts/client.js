$(onReady);

function onReady() {
  getTodoList();
  $('#input-area').on('click', '#add', postTodo);
  $('#todo-area').on('change', 'input[name=checkbox]', onCheck);
  $('#todo-area').on('click', '#delete', deleteTodo);
}

// Function that gets the to-do list data from
// a database and appends it to the DOM
function getTodoList() {
  // Set up ajax GET route
  $.ajax({
    method: 'GET',
    url: '/todoList',
  })
    // Response should be the entire database of to-do info
    .then(function (response) {
      // Clear the existing to-do area
      $('#todo-area').empty();
      console.log('GET response', response);
      // Iterate through the array of to-do items
      for (item of response) {
        // Append each item to the DOM as a checkbox
        // Ternary operators are used to apply the 'checked' property to the checkbox
        // and the 'hidden' class to the delete button based on information received from the database
        $('#todo-area').append(`
          <div class="todo-item">
            <input type="checkbox" name="checkbox" id="${item.id}"data-id="${
          item.id
        }" 
            ${item.isComplete ? 'checked' : ''}>
            <label class="strikethrough" for=${item.id}>${item.todo}</label>
            <button class="${
              item.isComplete ? '' : 'hidden'
            }" id="delete" type="button" data-id="${item.id}">x</button>
          </div>
        `);
      }
    })
    // Error handling
    .catch(function (error) {
      console.log('GET error', error);
    });
}

// Function that is called when the user inputs a new to-do item
function postTodo(event) {
  // Prevent refresh on submit
  event.preventDefault();
  // Simple validation to make sure a non-empty value is entered
  if ($('#todo-in').val() === null || $('#todo-in').val() === '') {
    console.log('Please enter valid input');
    alert('Please enter a valid to-do item.');
    return;
  }
  // Set up ajax POST route
  $.ajax({
    method: 'POST',
    url: '/todoList',
    // The data will be whatever is inputted by the user
    data: {
      todo: $('#todo-in').val(),
    },
  })
    .then(function (response) {
      // Clear the input
      $('#todo-in').val('');
      // Call getTodoList to update the DOM
      getTodoList();
    })
    // Error handling
    .catch(function (error) {
      console.log('POST error', error);
    });
}

// Function that is called when the user clicks a red X / delete button
function deleteTodo() {
  // Use an alert to verify the user wants to delete the to-do
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this to-do item!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
    // Handle success
  }).then((willDelete) => {
    if (willDelete) {
      swal('Your to-do has been deleted!', {
        icon: 'success',
      });
      // Grab the data-id of the clicked button and assign it to todoId
      let todoId = $(this).data('id');
      console.log('todoId', todoId);
      // Set up DELETE route
      $.ajax({
        method: 'DELETE',
        url: `/todoList/${todoId}`,
      })
        .then(function (response) {
          console.log('delete complete');
          // Call getTodoList to update the DOM
          getTodoList();
        })
        // Handle error
        .catch(function (error) {
          console.log('DELETE error', error);
        });
      // If user decides not to delete
    } else {
      swal('Your to-do is safe!');
    }
  });
}

// Function that is called when a user clicks a to-do item's checkbox
function onCheck() {
  // Use data-id to grab the id of the corresponding to-do item
  let todoId = $(this).data('id');
  console.log('checked id', todoId);
  // Check if the checkbox has property of checked
  if ($(this).is(':checked')) {
    // If it is checked
    // call completeTodo using the id as the argument
    completeTodo(todoId);
  } else {
    // If it is NOT checked
    // call undoTodo using the id as the argument
    undoTodo(todoId);
  }
  // Call getTodoList to update the DOM
  getTodoList();
}

// Function that is called within
// onCheck when a checkbox is checked
// Updates to-do's inComplete property to TRUE
function completeTodo(todoId) {
  console.log('complete todoId', todoId);
  // Set up PUT route
  $.ajax({
    method: 'PUT',
    url: `/todoList/complete/${todoId}`,
    // Use the id of the checkbox to access the same id in the database
    data: {
      todoId,
    },
  })
    // Handle success
    .then(function (response) {
      console.log('completed success');
    })
    // Handle error
    .catch(function (error) {
      console.log('PUT error', error);
    });
}

// Function that is called within
// onCheck when a checkbox is unchecked
// Updates to-do's isComplete property to FALSE
function undoTodo(todoId) {
  console.log('undo todoId', todoId);
  // Set up PUT route
  $.ajax({
    method: 'PUT',
    url: `/todoList/undo/${todoId}`,
    // Use the id of the checkbox to access the same id in the database
    data: {
      todoId,
    },
  })
    // Handle success
    .then(function (response) {
      console.log('UNDO success');
    })
    // Handle error
    .catch((error) => {
      console.log('UNDO error', error);
    });
}
