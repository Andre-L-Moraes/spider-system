    // Função de validação principal que é chamada quando um evento de validação ocorre.
export function valida(input) {
    // Obtém o tipo de entrada do atributo "data-tipo" do elemento de entrada.
    const tipoDeInput = input.dataset.tipo;

    // Verifica se há um validador correspondente para o tipo de entrada.
    if (validadores[tipoDeInput]) {
        // Chama a função de validação correspondente ao tipo de entrada.
        validadores[tipoDeInput](input);
    }

    // Verifica se o campo de entrada é válido de acordo com as regras de validação do navegador.
    if (input.validity.valid) {
        // Se for válido, remove a classe de erro e limpa a mensagem de erro.
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        // Se não for válido, adiciona a classe de erro e exibe a mensagem de erro apropriada.
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}

// Tipos de erros que podem ocorrer durante a validação.
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

// Mensagens de erro para diferentes tipos de campos de entrada e erros.
const mensagensDeErro = {
    // Exemplo para o campo "nome".
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.'
    },
    // Exemplo para o campo "email".
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    // ...
};

// Mapeia tipos de entrada para funções de validação correspondentes.
const validadores = {
    // Exemplo para o campo "dataNascimento".
    dataNascimento: input => validaDataNascimento(input),
    // Exemplo para o campo "cpf".
    cpf: input => validaCPF(input),
    // Exemplo para o campo "cep".
    cep: input => recuperarCEP(input)
};

// Função que determina a mensagem de erro com base no tipo de entrada e nos erros de validação.
function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = '';
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro];
        }
    });

    return mensagem;
}

// Função de validação para o campo "dataNascimento".
function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    let mensagem = '';

    // Verifica se a data de nascimento é menor que 18 anos.
    if (!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.';
    }

    // Define a mensagem de erro personalizada, se necessário.
    input.setCustomValidity(mensagem);
}

// Função para verificar se a data é maior que 18 anos.
function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataMais18 <= dataAtual;
}

// Função de validação para o campo "cpf".
function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    // Verifica se o CPF não é repetido e tem a estrutura correta.
    if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.';
    }

    // Define a mensagem de erro personalizada, se necessário.
    input.setCustomValidity(mensagem);
}

// Função para verificar se o CPF não é repetido.
function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];
    let cpfValido = true;

    valoresRepetidos.forEach(valor => {
        if (valor == cpf) {
            cpfValido = false;
        }
    });

    return cpfValido;
}

// Função para verificar a estrutura do CPF.
function checaEstruturaCPF(cpf) {
    const multiplicador = 10;

    return checaDigitoVerificador(cpf, multiplicador);
}

// Função para verificar o dígito verificador do CPF.
function checaDigitoVerificador(cpf, multiplicador) {
    if (multiplicador >= 12) {
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        contador++;
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }

    return false;
}

// Função para confirmar o dígito verificador do CPF.
function confirmaDigito(soma) {
    return 11 - (soma % 11);
}

// Função para recuperar informações de CEP da API ViaCEP.
function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    };

    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url, options).then(
            response => response.json()
        ).then(
            data => {
                if (data.erro) {
                    input.setCustomValidity('Não foi possível buscar o CEP.');
                    return;
                }
                input.setCustomValidity('');
                preencheCamposComCEP(data);
                return;
            }
        );
    }
}

// Função para preencher campos de endereço com os dados do CEP.
function preencheCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}
