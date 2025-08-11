#!/usr/bin/env node

const axios = require('axios');
const readline = require('readline');

// Configurações
const API_URL = 'https://viacep.com.br/ws';

// Cria interface para leitura de input. 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para validar o CEP
function validarCEP(cep) {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    // Verifica se tem 8 dígitos
    if (cepLimpo.length !== 8) {
        return false;
    }

    return cepLimpo;
}

// Função para buscar o endereço
async function buscarEndereco(cep) {
    try {
        const response = await axios.get(`${API_URL}/${cep}/json/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar a API:', error.message);
        return null;
    }
}

// Função para exibir o endereço
function exibirEndereco(dados) {
    if (dados.erro) {
        console.log('CEP não encontrado.');
        return;
    }

    console.log('\nInformações do Endereço:');
    console.log('-----------------------');
    console.log(`CEP: ${dados.cep}`);
    console.log(`Logradouro: ${dados.logradouro || 'Não informado'}`);
    console.log(`Complemento: ${dados.complemento || 'Não informado'}`);
    console.log(`Bairro: ${dados.bairro || 'Não informado'}`);
    console.log(`Localidade: ${dados.localidade}`);
    console.log(`UF: ${dados.uf}`);
    console.log(`IBGE: ${dados.ibge}`);
    console.log(`GIA: ${dados.gia || 'Não informado'}`);
    console.log(`DDD: ${dados.ddd}`);
    console.log(`SIAFI: ${dados.siafi}`);
    console.log('-----------------------\n');
}

// Função principal
async function main() {
    // Verifica se o CEP foi passado como argumento
    if (process.argv[2]) {
        const cepArg = process.argv[2];
        const cepValido = validarCEP(cepArg);

        if (!cepValido) {
            console.log('Formato de CEP inválido. Use 00000000 ou 00000-000');
            process.exit(1);
        }

        const endereco = await buscarEndereco(cepValido);
        if (endereco) {
            exibirEndereco(endereco);
        }
        process.exit(0);
    }

    // Se não houver argumento, pede o CEP interativamente
    rl.question('Digite o CEP (apenas números ou no formato 00000-000): ', async (cepInput) => {
        const cepValido = validarCEP(cepInput);

        if (!cepValido) {
            console.log('Formato de CEP inválido. Use 00000000 ou 00000-000');
            rl.close();
            process.exit(1);
        }

        const endereco = await buscarEndereco(cepValido);
        if (endereco) {
            exibirEndereco(endereco);
        }
        rl.close();
    });
}

// Executa o programa
main();