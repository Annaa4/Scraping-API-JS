document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        loginUser(username, password);
    });
});

async function loginUser(username, password) {
    try {
            const response = await fetch('http://localhost:4300/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
        });

    const data = await response.json();

        if (response.ok) {
            // La connexion réussit
            alert('Connexion réussie !');
            // Rediriger l'utilisateur vers la page "admin.html" après une connexion réussie
            window.location.href = 'admin.html';
        } else {
            // La connexion a échoué
            alert('Nom d\'utilisateur ou mot de passe incorrect !');
        }
    } catch (error) {
        console.log('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion.');
    }
}
