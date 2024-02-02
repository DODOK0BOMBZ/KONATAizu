Webcam.set({
    width:350,
    height:300,
    imageFormat : 'png',
    pngQuality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PqV0a7hhH/model.json' ,modelLoaded)

function modelLoaded()
{
    console.log('Model Loaded!');
}


function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);

}

function gotResults(error, results) {

    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("resultGestureName").innerHTML = results[0].label;
        document.getElementById("resultGestureName2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + prediction1;
    speakData2 = "A segunda previsão é " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

