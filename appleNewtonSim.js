/*
primera ley de newton

  todo cuerpo permanece en reposo hasta que se le aplica
  una fuersa y se detiene cuando se le aplica otra igual a
  la de su velocidad
  
segunda ley de newton

  a mayor fuersa mayor aceleracion, a mas masa mas fuersa hay
  que aplicarle
  
tercera ley de newton

  si empujas algo, ese algo tambien te empuja a ti

*/

var posX = 30;
var posY = 30;
var simX = 30;
var simY = 250;
var ready = false;
var simEnabled = false;
var busyColor = 0;
var appleHold = 0;
var gravity = 0 - 9.81;
var appleSpeed = 0;
var status1 = "Listo Para Comenzar";
var status2 = "[status2] = En espera de datos...";
var status3 = "[status3] = En espera de datos...";
var status4 = "[status4] = En espera de datos...";
var impactSubject;
var increment = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  var inpTree = createInput("0");
  inpTree.position(posX + 200, posY + 20);
  inpTree.size(100);
  inpTree.input(treeForce);
  
  var inpApple = createInput("0");
  inpApple.position(posX + 200, posY + 60);
  inpApple.size(100);
  inpApple.input(appleMass);
  
  var inpInpact = createInput("0");
  inpInpact.position(posX + 200, posY + 100);
  inpInpact.size(100);
  inpInpact.input(inpactHeight);
  
  
  var startButton = createButton("Iniciar");
  startButton.position(posX + 275, posY + 175);
  startButton.size(80);
  startButton.mousePressed(dropSimulation);
}

function treeForce() {
  console.log("fuerza del arbol: " + this.value());
  appleHold = this.value();

}

function appleMass() {
  console.log("masa de la manzana: " + this.value());
  appleWeight = this.value();

}

function inpactHeight() {
  console.log("altura de impacto: " + this.value());
  impactSubject = this.value();

}

function dropSimulation(){ 
  console.log("simulation");
  ready = true;
  simEnabled = true;
  increment = true;
  
  var posX = 30;
  var posY = 30;
  var simX = 30;
  var simY = 250;


  var busyColor = 0;
  var appleHold = 0;
  var gravity = 0 - 9.81;
  var appleSpeed = 0;
  var status1 = "Listo Para Iniciar";
  var status2 = "(status2) = En espera de datos...";
  var status3 = "(status3) = En espera de datos...";
  var status4 = "(status4) = En espera de datos...";
  var impactSubject;

}




function draw() {
  background(180, 255, 239);
  
  //if(impactSubject >= 0){
  //status4 = "[!!!] Caida al Vacio";
  //}
  
  //Cuadro de parametros de simulacion
  fill(220, 220, 220);
  rect(posX + 5, posY + 5,  360, 200, 10);
  fill(0, 0, 0);
    text("Simulacion de Manzana de Newton por Iv Ponce", 20, 20);
    text("Fuerza de Fijacion del Arbol[N]", posX + 20, posY + 30);
    text("Masa de la Manzana[Kg]", posX + 20, posY + 70);
    text("Altura de Impacto[m]", posX + 20, posY + 110);

  //Cuadro de estado de la simulacion
  fill(220, 220, 220);
  rect(simX + 5, simY + 5,  360, 200, 10);
  fill(0, 0, 0);
    textSize(20);
    fill(255, 100, 0);
    text(status1, simX + 20, simY + 70);
    textSize(12);
    fill(0, 0, 0);
    text(status2, simX + 20, simY + 100);
    text(status3, simX + 20, simY + 130);
    text(status4, simX + 20, simY + 160);

  //barra vacia de progreso
  fill(220, 220, 220);
  rect(simX + 5, simY + 225,  360, 20, 10);
  fill(0, 0, 0);
  
  //barra de progreso
  fill(0, 220, 50);
  rect(simX + 5, simY + 225,  20, 20, 10);
  fill(0, 0, 0);
  
  if(ready === false){
    text("Listo para Iniciar", mouseX + 10, mouseY);
  } 
  if(ready === true && simEnabled === false) {
    fill(255, 0, 0);
    text("Simulacion Terminada, Reiniciar Programa", mouseX + 10, mouseY);
    fill(0, 0, 0);
    
      //barra de progreso
      fill(0, 220, 50);
      rect(simX + 5, simY + 225,  360, 20, 10);
      fill(0, 0, 0);
  }
  if(ready === true && simEnabled === true){
    fill(busyColor, 0, busyColor);
    text("Espere, Simulando...", mouseX + 10, mouseY);
    if(busyColor >= 255){
      busyColor = 0;
    } else{
      busyColor++;
    }
  }
  
  //simulacion
  if(simEnabled === true){
    ////calcular caida
    appleHold--;
    if(gravity > appleHold){
      console.log("manzana en caida libre");
      status1 = "[Step 2] Manzana en Caida Libre";
      
      //barra de progreso
      fill(0, 220, 50);
      rect(simX + 5, simY + 225,  220, 20, 10);
      fill(0, 0, 0);
      
      if(increment === true){
      appleSpeed += 0.981;
      }
      
      status3 = "Velocidad de Manzana : " + appleSpeed;
      console.log(appleSpeed);
      
        if(appleSpeed > impactSubject){
          increment = false;

          console.log("inpacted!!!");
          status1 = "[Step 3] Objetivo Impactado";
          
          
          force = appleWeight * (appleSpeed * 10);
          force =  force;
          
          status4 = "Fuerza de Impacto : " + force;
          simEnabled = false;
          
        }
    
    } else{
      console.log("manzana en reposo" + appleHold);
      status1 = "[Step 1] Manzana en Reposo";
      status2 = "Fuerza del Arbol : " + appleHold;
      status3 = "[---]";
      status4 = "[---]"
      
      //barra de progreso
      fill(0, 220, 50);
      rect(simX + 5, simY + 225,  120, 20, 10);
      fill(0, 0, 0);
    }
    
  }
}
