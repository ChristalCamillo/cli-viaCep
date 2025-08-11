# cli-viaCep
CLI que consulta informações de endereço a partir de um CEP usando a API pública ViaCEP

# Tornando o arquivo executável(*nix)

chmod u+x cep-cli.js (dará permissão de execução do programa apenas para o usuário do programa)

# Uso

// programa manager de apis publicas fazendo requests http simplificando

npm install axios

# Execute de uma das seguintes formas:

Passando o CEP como argumento:

./cep-cli.js 01001000

ou

node cep-cli.js 01001-000

Sem argumentos (modo interativo - usando a biblioteca de interface):

./cep-cli.js

# Estudo do código 

Cria interface para leitura de input. Essa biblioteca já veio com o node 
 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

Se não houver argumento, pede o CEP interativamente

        rl.question('Digite o CEP (apenas números ou no formato 00000-000): ', async (cepInput) => {
        const cepValido = validarCEP(cepInput);

        if (!cepValido) {
            console.log('Formato de CEP inválido. Use 00000000 ou 00000-000');
            rl.close();
            process.exit(1);
        }

        if (!cepValido) {
            console.log('Formato de CEP inválido. Use 00000000 ou 00000-000');
            rl.close();
            process.exit(1);
        }

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
