rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Dua_Lipa = "";
song_Stay_By_Justin_Bieber = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Dua_Lipa_song = loadSound("No-Lie_320(PaglaSongs).mp3");
    Stay_By_Justin_Bieber_song = loadSound("Stay_320(PagalWorld).mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#DC143C");
    stroke("#DC143C");

    song_Dua_Lipa = Dua_Lipa_song.isPlaying();
    console.log(song_Dua_Lipa);

    song_Stay_By_Justin_Bieber = Stay_By_Justin_Bieber_song.isPlaying();
    console.log(song_Stay_By_Justin_Bieber);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Stay_Justin_song.stop();
        if(song_Dua_Lipa == false){
            Dua_Lipa_song.play();
        }
        else{
            console.log("Song Name: Dua Lipa Song");
            document.getElementById("song_id").innerHTML = "Song Name: Dua Lipa Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Dua_Lipa_song.stop();
        if(song_Stay_By_Justin_Bieber == false){
            Stay_By_Justin_Bieber_song.play();
        }
        else{
            console.log("Song Name: Stay By Justin Bieber Song");
            document.getElementById("song_id").innerHTML = "Song Name: Stay By Justin Bieber Song";
        }
    }
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}