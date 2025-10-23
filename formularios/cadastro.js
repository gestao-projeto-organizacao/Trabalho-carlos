// cadastro.js



const API_BASE_URL = 'http://127.0.0.1:8000';


const form = document.getElementById('cadastroForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirmar').value;


    if (password !== confirmar) {
        alert('As senhas não coincidem!');
        return; 
    }

    if (!username || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const dadosUsuario = {
        username: username,
        email: email,
        password: password
    };


    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/`, {
            method: 'POST',
            headers: {
              
                'Content-Type': 'application/json'
            },
      
            body: JSON.stringify(dadosUsuario)
        });

      
        if (response.ok) {
            const novoUsuario = await response.json();


            const userId = novoUsuario.id || novoUsuario._id; 


            if (userId) {
                alert(`👄 Arrasou diva! Usuário ${novoUsuario.username} cadastrado com o ID: ${userId}`);
            } else {
                alert(`👄 Arrasou diva! Usuário ${novoUsuario.username} cadastrado. ID não encontrado na resposta.`);
            }


            window.location.href = 'login.html';

        }

    } catch (error) {
        console.error('Erro de conexão com a API:', error);
        alert('🚫 Não foi possível conectar ao servidor. Verifique se a API está rodando.');
    }
});