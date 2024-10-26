const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarPausarBt = document.querySelector('#start-pause span');
const buttonIcon = document.querySelector('.app__card-primary-button-icon');

const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;

const pauseAudio = new Audio('sons/pause.mp3');
const playAudio = new Audio('sons/play.wav');
const stopAudio = new Audio('sons/beep.mp3');

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    botoes.forEach(botao => botao.classList.remove('active'));

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa<strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">faça uma pausa curta!<strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">faça uma pausa longa!<strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    tempoDecorridoEmSegundos -= 1;
    if (tempoDecorridoEmSegundos <= 0) {
        parar();
        stopAudio.play();
        alert('Tempo esgotado');
        return;
    }
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        pauseAudio.play();
        parar();
        return;
    }
    iniciarPausarBt.textContent = 'Pausar';
    buttonIcon.setAttribute('src', 'imagens/pause.png');
    playAudio.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function parar() {
    iniciarPausarBt.textContent = 'Começar';
    buttonIcon.setAttribute('src', 'imagens/play_arrow.png');
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();