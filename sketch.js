//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;

//velocidade da bolinha
let raio = diametro/2;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("./trilha.mp3");
    ponto = loadSound("./ponto.mp3");
    raquetada = loadSound("./raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}
  
function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
    calculaChanceDeErrar();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if(xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }

    if(yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if(keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }

    if(keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }

    // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete = constrain(yRaquete, 10, 310);
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);

    if(colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function movimentaRaqueteOponente() {
    //SINGLEPLAYER
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2 - 30;

    yRaqueteOponente += velocidadeYOponente;

    yRaqueteOponente = constrain(yRaqueteOponente, 10, 310); // Limitar a movimentação da raquete para que ela não ultrapasse as bordas
    calculaChanceDeErrar();

    /*//MULTIPLAYER
    if(keyIsDown(87)) {
        yRaqueteOponente -= 10;
    }

    if(keyIsDown(83)) {
        yRaqueteOponente += 10;
    }*/
}

function incluiPlacar() {
    stroke(255); //contorno do placar
    textAlign(CENTER); //alinhar a placar no centro
    textSize(16); //tamanho da fonte
    fill(color(255, 140, 0)); //cor do quadro dos meus pontos
    rect(150, 10, 40, 20); //criar o quadro dos meus pontos
    fill(255); //cor da fonte do placa
    text(meusPontos, 170, 26); //posição dos meus pontos 
    fill(color(255, 140, 0)); //cor do quadro do meu oponente
    rect(450, 10, 40, 20); //criar o quadro dos pontos do oponente
    fill(255); //cor da fonte do placa
    text(pontosDoOponente, 470, 26); //posição dos pontos do oponentes
}

function marcaPonto() {
    if(xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }

    if(xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function calculaChanceDeErrar() {
    if (pontosDoOponente >= meusPontos) {
      chanceDeErrar += 1
      if (chanceDeErrar >= 39){
      chanceDeErrar = 40
      }
    } else {
      chanceDeErrar -= 1
      if (chanceDeErrar <= 35){
      chanceDeErrar = 35
      }
    }
  }
