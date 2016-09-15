let $newContactForm, $newName, $newNumber, $newEmail, $newSkype, $contactList;

$(() => {
  $newContactForm = $('#newContactForm')
  $newName = $('#newName');
  $newNumber = $('#newNumber');
  $newEmail = $('#newEmail');
  $newSkype = $('#newSkype');
  $contactList = $('#contactList');

  //create contact
  $newContactForm.submit(createContact);

  //edit, done, delete
  $contactList.on('click', '.edit', editContact);
  $contactList.on('click', '.done', resubmitContact);
  $contactList.on('click', '.delete', removeContact);
})

function editContact(event) {
  let $target = $(event.target);
  let $tr = $target.closest('tr');

  //make Done Button appear
  console.log($target.parent());
  $target.next().removeClass('hidden');

  let currName = $tr.children('.name').html();
  let currEmail = $tr.children('.email').html();
  let currNumber = $tr.children('.number').html();
  let currSkype = $tr.children('.skype').html();

  //set input field with values
  $newName.val(currName);
  $newEmail.val(currEmail);
  $newNumber.val(currNumber);
  $newSkype.val(currSkype);

  //add class 'edited'
  $tr.addClass('edited');

  //disable Add button
  $('.add').prop('disabled', true);
  $('.edit').prop('disabled', true);
  $('.delete').prop('disabled', true);
}

function resubmitContact(event) {
  event.preventDefault();
  let $target = $(event.target);

  let nameEdited = $newName.val();
  let emailEdited = $newEmail.val();
  let numberEdited = $newNumber.val();
  let skypeEdited = $newSkype.val();

  //clear input fields
  $newName.val('');
  $newEmail.val('');
  $newNumber.val('');
  $newSkype.val('');

  let $edited = $('.edited');

  $edited.children('.name').html(nameEdited);
  $edited.children('.email').html(emailEdited);
  $edited.children('.number').html(numberEdited);
  $edited.children('.skype').html(skypeEdited);

  $edited.removeClass('edited');

  $('.add').prop('disabled', false);
  $('.edit').prop('disabled', false);
  $('.delete').prop('disabled', false);

  $target.addClass('hidden');
}

function removeContact(event) {
  let $target = $(event.target);
  $target.closest('tr').remove();
}

function createContact(event) {
  event.preventDefault();

  let name = $newName.val();
  let email = $newEmail.val();
  let number = $newNumber.val();
  let skype = $newSkype.val();

  //clear inputs
  $newName.val('');
  $newEmail.val('');
  $newNumber.val('');
  $newSkype.val('');

  let $row = createNewRow(name, email, number, skype);

  $contactList.append($row);
}

function createNewRow(name1, email1, number1, skype1) {
  let $row = $('#ghostRow').clone();

  $row.children('.name').text(name1);
  $row.children('.email').text(email1);
  $row.children('.number').text(number1);
  $row.children('.skype').text(skype1);

  return $row;
}
