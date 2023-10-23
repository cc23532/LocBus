// Função para validar um CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false; // O CPF deve ter 11 dígitos

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    if (remainder !== parseInt(cpf[10])) return false;

    return true;
}

// Função para validar um endereço de email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

// Função para verificar a compatibilidade de senhas
function verificarCompatibilidadeSenhas(senha, confirmaSenha) {
    return senha === confirmaSenha;
}
