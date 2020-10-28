let myAltos = [];
let myBasses = [];
let mySopranos = [];
let myTenors = [];

function preload(){

  //audio
  audio = loadSound("assets/audio.mp3");

}

function setup() {

fft = new p5.FFT(); //fast Fourier Transform

  createCanvas(windowWidth,windowHeight)
  for (let i = 0; i < 1; i++) {
    addSoprano();
  }
  for (let j = 0; j < 1; j++) {
    addAlto();
  }
  for (let k = 0; k < 1; k++) {
    addBass();
  }
  for (let n = 0; n < 1; n++) {
    addTenor();
  }


}

//start song

function mouseClicked() {
    if (audio.isPlaying() == false) {
      audio.play();
      audio.loop();
    }
  }

//Press the key to add a new chorister

function keyPressed(){
  if ((key == 'B') || (key == 'b')) {
   addBass();
 } else if ((key == 'S') || (key == 's')){
   addSoprano();
 } else if ((key == 'A') || (key == 'a')){
   addAlto();
 } else if ((key == 'T') || (key == 't')){
   addTenor();
 }

  }


function draw() {

background('black');

  for(let i = 0; i < mySopranos.length; i++) {
    mySopranos[i].run();
  }
  for(let j = 0; j < myAltos.length; j++) {
    myAltos[j].run();
  }
  for(let k = 0; k < myBasses.length; k++) {
    myBasses[k].run();
  }
  for(let n = 0; n < myTenors.length; n++) {
    myTenors[n].run();
  }

//TESTO
var myText = " Click to play the song";
var myText2 = "press S, A, T or B to add a chorister";

push();
textAlign(CENTER);
textFont("Montserrat"); //FONT IMPORTATO
noStroke();
textSize(30);
var colore = color('white');
colore.setAlpha(10000 - millis());
fill(colore);
text(myText, width/2, 120);
text(myText2, width/2, 360);
pop();

}

//SOPRANO

function addSoprano(){
  const aNewSoprano = new Soprano(random(windowWidth), random(windowHeight), random(10,50), 'pink')
  mySopranos.push(aNewSoprano);
}

class Soprano {
  constructor(temp_x,temp_y,temp_r,temp_color) {
    this.x=temp_x;
    this.y=temp_y;
    this.r=temp_r;
    this.color=temp_color;
  }
  display() {
    push();
    noFill();
    stroke(this.color);
    ellipse(this.x,this.y,this.r*2);
    pop();
  }
  updateRadius(){
    fft.analyze(); //analyze audio frequencies
    var treble = fft.getEnergy("treble");
    var mapTreble = map(treble, 0, 255, 10, 300);
    this.r= mapTreble;
  }

  run() {
    this.display();
    this.updateRadius();
  }
}

//CONTRALTO

  function addAlto(){
    const aNewAlto = new Alto(random(windowWidth), random(windowHeight), random(10,50), 'purple')
    myAltos.push(aNewAlto);
  }

  class Alto {
    constructor(temp_x,temp_y,temp_r,temp_color) {
      this.x=temp_x;
      this.y=temp_y;
      this.r=temp_r;
      this.color=temp_color;
    }
    display() {
      push();
      noFill();
      stroke(this.color);
      ellipse(this.x,this.y,this.r*2);
      pop();
    }
    updateRadius(){
      fft.analyze();
      var mid = fft.getEnergy("mid");

      var mapMid = map(mid, 0, 255, 10, 250);
      this.r= mapMid;
    }

    run() {
      this.display();
      this.updateRadius();
    }
  }

//BASSO

    function addBass(){

      const aNewBass = new Bass(random(windowWidth), random(windowHeight), 15, 'blue')
      myBasses.push(aNewBass);
    }

    class Bass {
      constructor(temp_x,temp_y,temp_r,temp_color) {
        this.x=temp_x;
        this.y=temp_y;
        this.r=temp_r;
        this.color=temp_color;
      }

      display() {
        push();
        noFill();
        stroke(this.color);
        ellipse(this.x,this.y,this.r*2);
        pop();
      }
      updateRadius(){
        fft.analyze();

        var bass = fft.getEnergy("bass");

        var mapBass = map(bass, 0, 255, 10, 170);
        this.r= mapBass;
      }

      run() {
        this.display();
        this.updateRadius();
      }
    }
    function addTenor(){

      const aNewTenor = new Tenor(random(windowWidth), random(windowHeight), 15, 'cyan')
      myTenors.push(aNewTenor);
    }

//TENORE

    class Tenor {
      constructor(temp_x,temp_y,temp_r,temp_color) {
        this.x=temp_x;
        this.y=temp_y;
        this.r=temp_r;
        this.color=temp_color;
      }

      display() {
        push();
        noFill();
        stroke(this.color);
        ellipse(this.x,this.y,this.r*2);
        pop();
      }
      updateRadius(){
        fft.analyze();

        var lowMid = fft.getEnergy("lowMid");

        var mapLowMid = map(lowMid, 0, 255, 10, 150);
        this.r= mapLowMid;
      }

      run() {
        this.display();
        this.updateRadius();
      }
    }




    function windowResized(){
      resizeCanvas(windowWidth, windowHeight);
      background('black');
    }
