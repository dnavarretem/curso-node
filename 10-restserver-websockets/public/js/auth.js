const miFormulario = document.querySelector('form');

// URL dependiendo del entorno
const url = (window.location.hostname.includes('localhost'))
  ? 'http://localhost:8080/api/auth/'
  : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


miFormulario.addEventListener('submit', ev => {
  ev.preventDefault();

  const formData = {};

  for (let el of miFormulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + 'login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resp => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.error(msg);
      }
      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(err => {
      console.log(err);
    })
})

// Esta función se llamará cuando el usuario inicie sesión correctamente
function onSignIn(response) {
  const id_token = response.credential; // Se obtiene el token JWT directamente desde el response

  const data = { id_token }; // Empaquetamos el token en un objeto

  // Enviamos el token a nuestro backend
  fetch(url + 'google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(({ token }) => {
      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(console.log);
}

// Función para cerrar sesión
function signOut() {
  // Con la nueva API, simplemente deshabilitamos la selección automática
  google.accounts.id.disableAutoSelect();
  localStorage.removeItem('token');
  console.log('User signed out.');
}
