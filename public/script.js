const nameInput = document.getElementById('name');
const descInput = document.getElementById('description');
const startInput = document.getElementById('start-date');
const dueInput = document.getElementById('due-date');

document.getElementById('trello-form').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const submitData = {
    name: nameInput.value,
    desc: descInput.value,
    start: startInput.value,
    due: dueInput.value,
  };
  try {
    const response = await fetch('http://localhost:4000/api/createCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });
    const data = await response.json();
    console.log('Card created successfully', data);
    if (response.ok) {
      alert('Card created successfully!');
      resetInputFields();
    } else {
      alert('Error creating card.');
    }
  } catch (err) {
    console.log(err);
  }
}

function resetInputFields() {
  nameInput.value = '';
  descInput.value = '';
  startInput.value = '';
  dueInput.value = '';
}
