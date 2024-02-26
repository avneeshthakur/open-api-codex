
const chatContainer = document.getElementById('chat_container');
const form = document.getElementById('chat_form');


const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: formData.get('prompt')
    })
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data,'data');
  } else {
    console.log(response,'error')
  }


}

form.addEventListener('submit', handleSubmit);
