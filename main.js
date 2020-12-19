var SpeechRecognition = window.webkitSpeechRecognition;
var Recognition = new SpeechRecognition();

function start() {
  document.getElementById("textbox").innerHTML = "";
  Recognition.start();
}

Recognition.onresult = function (event) {
  var content = event.results[0][0].transcript;
  console.log(content);
  document.getElementById("textbox").innerHTML = content;
  if (content == "take my selfie") {
    console.log("Taking Selfie...");
    speak();
  }
};

function speak() {
  var synth = window.speechSynthesis;
  speak_data = "Taking Your Selfie in 5 Seconds";
  var utter = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utter);
  Webcam.attach(camera);
  setTimeout(function(){
    take_snapshot();
    save();
  }, 5000);
}

Webcam.set({ width: 360, height: 250, image_format: "gif", gif_quality: 90 });
camera = document.getElementById("camera");

function take_snapshot() {
  Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="selfie_img" src="'+ data_uri + '">'; 
  });
}

function save() {
  link = document.getElementById("link");
  image = document.getElementById("selfie_img").src;
  link.href = image;
  link.click();
}
