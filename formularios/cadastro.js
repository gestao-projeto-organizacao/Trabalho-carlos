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

    // 6. Enviar a requisição POST para a API
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/`, {
            method: 'POST',
            headers: {
                // Informa a API que o corpo da requisição é JSON
                'Content-Type': 'application/json'
            },
            // Converte o objeto JavaScript para uma string JSON
            body: JSON.stringify(dadosUsuario)
        });

        // 7. Processar a resposta da API
        if (response.ok) {
            const novoUsuario = await response.json();

            // CORREÇÃO: Certifique-se de acessar 'id' e 'username'
            // Se o 'id' estiver undefined, podemos tentar acessar '_id' como fallback, 
            // mas o correto é que a API retorne 'id'.
            const userId = novoUsuario.id || novoUsuario._id; // Tenta 'id' ou usa '_id' como fallback

            // Use uma verificação simples antes de mostrar
            if (userId) {
                alert(`👄 Arrasou diva! Usuário ${novoUsuario.username} cadastrado com o ID: ${userId}`);
            } else {
                alert(`👄 Arrasou diva! Usuário ${novoUsuario.username} cadastrado. ID não encontrado na resposta.`);
            }

            // Opcional: Redirecionar para a página de login
            window.location.href = 'login.html';

        }

    } catch (error) {
        // Erro de rede (API não está rodando ou URL incorreta)
        console.error('Erro de conexão com a API:', error);
        alert('🚫 Não foi possível conectar ao servidor. Verifique se a API está rodando.');
    }
});