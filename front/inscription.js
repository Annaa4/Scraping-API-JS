const form = document.querySelector('form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const display = document.querySelector('.error')
form.addEventListener('submit', async (e) => {
   e.preventDefault()
   display.textContent = ''
   try {
     const res = await fetch('http://localhost:4000/api/auth/register', {
     method: 'POST',
     body: JSON.stringify({ username: username.value, password: password.value ,role:'admin'}),
     headers: { 'Content-Type': 'application/json' }
     })
     const data = await res.json()
     console.log(data)
     
 
      } catch (err) {
        console.log(err.message)
      }
    })