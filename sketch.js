let mic, recorder;
//soundFile;
let soundFinal;
let soundList = [];
// let textList = [];
let myRec;
//let delay;
//let r, g, b;
let bubbles = [];
let scribble = new Scribble(); 

let displayToilet,displayPlunger, displayPaper, displayTranslate;

let state = 0; // mousePress will increment from Record, to Stop, to Play

let shared;
function preload() {
  partyConnect(
    "wss://toilet-talk.herokuapp.com",
    "hello_party",
    "main"
  );
  shared = partyLoadShared("shared");
}

function setup() {
  
  createCanvas(500, 800);
 // shared.soundList = shared.soundList || [];
 // shared.textList = shared.textList || [];
 // shared.soundList = [];
  shared.textList = [];
  // bg = loadImage('graphpaper.png');
  background(225, 231, 235);
        textStyle(BOLD);
      fill(104, 160, 227);
  //toilet
   buttonToilet = createImg('toilet.png',"Click Here");
   buttonToilet.position(190,380);
   buttonToilet.size(100,150);
   buttonToilet.mousePressed(recordStart);
   displayToilet = createElement("text", "Click the toilet to record your mood");
   displayToilet.position (110,550);
   displayToilet.style("color: #68a0e3;font-family:courier; font-size: 13px;font-weight: bold; ");
   
  // toilet paper for text output
   buttonPaper = createImg('toiletpaper.png',"read");
   buttonPaper.position(340,380);
   buttonPaper.size(70,70);
   buttonPaper.mousePressed(displayText);
   //text('Read moods near me', 320, 350);
   displayPaper = createElement("text", "Read Moods Nearby");
   displayPaper.position (320, 350);
   displayPaper.style("color: #68a0e3;font-family:courier; font-size: 13px;font-weight: bold;");
  
  //toilet plunger for voice output 
   buttonPlunger = createImg('plunger.png',"listen");
   buttonPlunger.position(90,380);
   buttonPlunger.size(50,120);
   buttonPlunger.mousePressed(playRecords);
   displayPlunger = createElement("text", "Listen Moods Nearby");
   displayPlunger.position (55, 350);
   displayPlunger.style("color: #68a0e3;font-family:courier; font-size: 13px;font-weight: bold;");
  
   displayTranslate = createElement("text", "");
   displayTranslate.position(30, 700);
   displayTranslate.style("color: #4bc957;font-family:monaco; font-size: 10px;font-weight: bold;font-style: italic;");

  // create an audio in
    mic = new p5.AudioIn();
    myRec = new p5.SpeechRec();
  // users must manually enable their browser microphone for recording to work properly!
   mic.start();
		
  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
 // soundFile=new p5.SoundFile();
  
  


}


function draw() {

  //background(bg);
 //  fill(r, g, b, 127);
 //ellipse(100,100,30,30);
      background(225, 231, 235);
      bubbles.forEach((bubble) => {
        bubble.update();
        bubble.show();
    });

}


function recordStart() {

  // var soundFile;
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
 
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    var soundFile=new p5.SoundFile();
    recorder.record(soundFile);
    soundFinal=soundFile;
    myRec.onResult = showResult;
    myRec.start(); 
  //  background(250, 165, 105);
 
    // text('Recording now...Click to stop.', 170, 550);

    displayToilet.html("Recording now...Click to stop.");
    displayToilet.style("color: #f05630;");
    displayToilet.position (130,550);
    state++;
  } else if (state === 1) {
      recorder.stop(); // stop recorder, and send the result to soundFile

    //  background(225, 231, 235);
   
      displayToilet.html("Recording stopped. Click to play"); 
      displayToilet.style("color: #4bc957;");
      displayToilet.position (125,550);
    state++;
  } else if (state === 2) {
    //for(var i=0; i<soundFileList.length;i++){
      //var lastVoice = soundFinal.length - 1;
      soundFinal.play();
      // soundFinal.play();
      buttonVoice = createButton('I am brave to send my voice');
      buttonVoice.position(135, 580);
      buttonVoice.mousePressed(addSoundList);
      buttonVoice.style("background-color: white; color: #3c55c7;border-radius: 12px; padding: 10px; cursor: pointer;font-family:Courier New;")
     

    
      buttonText = createButton('I am shy, send in text');
      buttonText.position(155, 630);
      buttonText.mousePressed(addTextList);
     buttonText.style("background-color: white; color: #3c55c7;border-radius: 12px;    padding: 10px; cursor: pointer;font-family:Courier New;")
     
    
     // background(225, 231, 235);
  
      displayToilet.html("Click the toilet to record your mood");
      displayToilet.style("color: #68a0e3;");
      displayToilet.position (110,550);

      displayTranslate.html('"'+ myRec.resultString+'"');
   
  
    //saveSound(soundFile, 'mySound.wav'); // save file
    state=0;
  }
}

function addSoundList(){
   print('I am here');
   // shared.soundList.push(soundFinal);
   // print(shared.soundList);
   soundList.push(soundFinal);
   print(soundList);

}

function addTextList(){
  
   shared.textList.push(myRec.resultString);
   //print(soundFileList[i]);
  // print(shared.textList);
}

function showResult()
	{
		if(myRec.resultValue==true) {
			//background(192, 255, 192);
		//	text(myRec.resultString,180, 700);
			console.log(myRec.resultString);
		}
	}

function playRecords(){
    //var soundLength = shared.soundList.length;
    var soundLength = soundList.length;
    var num = int(random(0, soundLength));
  // print(shared.soundList[num]);
  //   shared.soundList[num].play();
 // shared.soundList = soundList;
  //  print("shared soundlist" + shared.soundList);
    soundList[num].play();

    const pos = createVector(mouseX, mouseY) // x, y    
    const vel = createVector(random(-3,3),
                             random(-3,3));
    const col = (color(
        random(0,255), // min, max
        random(0,255),
        random(0,255)
    ));
    const radius = random(60,150);

    bubbles.push(
        new Bubble(pos,vel,col,radius,'')
    );
}

function displayText(){
 //     var space = 20;
//   for(var i = 0; i < textList.length; i++){
       
//         text(textList[i],180,50+space);
//         space += 20;
//     }
     var textLength = shared.textList.length;
    var ranNum = int(random(0, textLength));
    var textInput = shared.textList[ranNum];
    const pos = createVector(mouseX, mouseY) // x, y    
    const vel = createVector(random(-2.5,2.5),
                             random(-2.5,2.5));
    const col = (color(
        random(0,255), // min, max
        random(0,255),
        random(0,255)
    ));
    const radius = random(60,150);

    bubbles.push(
        new Bubble(pos,vel,col,radius,textInput)
    );
    
}

var Bubble = (function () {

    function Bubble(pos, vel, col, radius,textInput) {
        this.pos = pos;
        this.vel = vel;
        this.col = col;
        this.radius = radius;
        this.textInput = textInput;
    }

    Bubble.prototype.show = function () {
        //noStroke();
        fill(225, 231, 235);
      
      stroke( this.col);
      strokeWeight( 3 );
     
        scribble.scribbleEllipse( this.pos.x, this.pos.y, this.radius, this.radius);
       // scribble.scribbleLine( 0, windowHeight, windowWidth, 10);
       // ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
      // var textLength = textList.length;
      // var num = int(random(0, textLength));
      textAlign(CENTER);
      text(this.textInput,this.pos.x, this.pos.y);
    }

    Bubble.prototype.update = function () {
        this.pos.add(this.vel);
       // this.edges();
    }

//     Bubble.prototype.edges = function () {
//         if (this.pos.x - (this.radius / 2) < 0 || this.pos.x + (this.radius / 2) > width) {
//             this.vel.x *= -1;
//         }

//         if (this.pos.y - (this.radius / 2) < 0 || this.pos.y + (this.radius / 2) > height) {
//             this.vel.y *= -1;
//         }
//     }

    return Bubble;
    
})();

