song = "";

leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;


function preload()
{
	song = loadSound("music.mp3");
}


function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet=ml5.poseNet(video,modelLoaded);
	poseNet.on('pose',gotPoses);

}


function modelLoaded(){

console.log('poseNet is initialized ');

}

function gotPoses(results){

if(results.length>0){

console.log(results)

scoreleftwrist=results[0].pose.keypoints[9].score;
leftwristX=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("leftwristX="+leftwristX+"leftwristY="+leftwristY);
rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("rightwristX="+rightwristX+"rightwristY="+rightwristY);
console.log("scoreleftwrist="+scoreleftwrist);

}

}


function draw() {
	image(video, 0, 0, 600, 500);
	fill("#f71b1b");
	stroke("#f71b1b");
	if(scoreleftwrist >0.2)
	{
		circle(leftwristX,leftwristY,20)
		inNumberleftwristY=Number(leftwristY)
		remove_decimal=floor(inNumberleftwristY);
		volume=removedecimals/550;
		document.getElementById("volume").innerHTML="volume="+volume;
		song.setVolume(volume);
	}

}

function play()
{
	song.play();
	song.setVolume(1)
	song.rate(1)
}