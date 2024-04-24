//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//variaveis da velocidade
let velocidadeX = 2;
let velocidadeY = 2;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variaveis da raquete do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYoponente;

let colidiu = false;

//placar do jogo
let pontos1 = 0;
let pontosOponente = 0;

//sons do jogo 
let raquetada;
let ponto;
let trilha;


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup(){
  createCanvas(600, 400);
  trilha.loop();
  
}

function draw(){
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentoRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBibli(xRaquete,yRaquete);
  colisaoRaqueteBibli(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcarPontos();
  bolinhaNaoFicaPresa();
 
}

//desenhar bolinha do jogo
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

//movimentar bolinha do jogo
function movimentaBolinha(){
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
}

//verificar colisão da bolinha
function verificaColisao(){
   if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeX *= -1;
  }
  
  if(yBolinha + raio > height || yBolinha -raio < 0){
    velocidadeY *= -1;
  }
}

//desenhar raquete 
function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

//movimentação da raquete 
function movimentoRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
   if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

//verificar colisão da raquete 
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura &&  yBolinha + raio > yRaquete){
    velocidadeX *= -1;
    
  }
}

function colisaoRaqueteBibli(x , y){
  colidiu = collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (colidiu){
    velocidadeX *= -1
    raquetada.play();
  }
}

//movimentação da raquete do oponente 
function movimentaRaqueteOponente(){
   if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
   if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}


//adicionar o placar ao jogo
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color (255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontos1, 170, 26);
  fill(color (255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

//marcar pontos 
function marcarPontos(){
  if(xBolinha > 593){
    pontos1 += 1;
    ponto.play();
  }
   if(xBolinha < 8){
     pontosOponente += 1;
     ponto.play();
   }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
