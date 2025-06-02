// puxei o h1 do html e fiz uma variavel para armazenar uma string, assim aparecendo visualmente sem ser em caixa
//Especifico do JavaScript

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';


// novamente puxei um paragrafo (p) em html e com uma variavel fiz uma modificação sem mexer no html

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.0});
}
//boa prática para não ficar na repetição de códigos...
function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto' );
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeDeElementosNalista = listaDeNumerosSorteados.length;
    //irá limpar assim que todos os números forem sorteados. 
    if(quantidadeDeElementosNalista == numeroEscolhido){
        listaDeNumerosSorteados = [];
    }
    //includes verifica se o numero que já foi sorteado foi escolhido, 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else {
        //adicionar o número na lista.
        listaDeNumerosSorteados.push();
        return numeroEscolhido;
    }

}



function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa' ; 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! `;
        exibirTextoNaTela('p', mensagemTentativas );
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
        numeroSecreto = gerarNumeroAleatorio();
        limparCampo();
        tentativas = 1;
        exibirMensagemInicial();
        document.getElementById('reiniciar').setAttribute('disabled', true);
}