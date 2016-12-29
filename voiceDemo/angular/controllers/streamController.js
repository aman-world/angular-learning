app.controller('streamController', function ($rootScope, $location) {
    var streamCtrl = this;
    streamCtrl.createWSConnection = createWSConnection;
    streamCtrl.closeWSConnection = closeWSConnection;
    streamCtrl.playUsingPlayer = playUsingPlayer;
    streamCtrl.streamAudio = streamAudio;
    streamCtrl.startRecording = startRecording;
    streamCtrl.stopRecording = stopRecording;
    streamCtrl.player = new window.Audio();

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    var context = new AudioContext();
    var mediaRecorder;
    var chunks = [];
    var startTime = 0;

    init();

    function createWSConnection() {
        var url = "ws://localhost:3000/user/id=" + Date.now().toString();
        ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
    }

    function closeWSConnection() {
        ws.close();
        console.log("Socket has been closed!");
    }

    ws.onopen = function(){
        console.log("Socket has been opened!");
    };

    ws.onclose = function(message) {
        console.log('Socket has been closed');
    };

    ws.onmessage = function(message) {
        if (message.data instanceof ArrayBuffer) {
            console.log("in arrayBuffer", message.data);
            context.decodeAudioData(message.data, function(soundBuffer){
                playBuffer(soundBuffer);
            },function(x) {
                console.log("decoding failed", x)
            });
        } else {
            console.log("not arrayBuffer", message.data);
        }
    };

    function startRecording() {
        mediaRecorder.start();
        console.log("mediaRecorder state: ",mediaRecorder.state);
        console.log("recorder started");
        $('#record').addClass('disabled');
        $('#stop').removeClass('disabled');

        getRecordedData();
    }

    function getRecordedData() {
        mediaRecorder.ondataavailable = function(e) {
            console.log('ondataavailable: ', e.data);
            chunks.push(e.data);
        };
    }

    function sendRecordedData() {
        var superBuffer = new Blob(chunks);
        console.log("sendRecordedData ",superBuffer);
        ws.send(superBuffer);
    }

    function stopRecording() {
        mediaRecorder.stop();
        console.log("mediaRecorder state: ",mediaRecorder.state);
        console.log("recorder stopped");
        $('#stop').addClass('disabled');
        $('#byPlayer').removeClass('disabled');

        mediaRecorder.onstop = function(e) {
            console.log("onstop() called.", e);
            var superBuffer = new Blob(chunks);
            streamCtrl.player.src = window.URL.createObjectURL(superBuffer);
            sendRecordedData();
            chunks = [];
        };
    }

    function playUsingPlayer() {
        $('#byPlayer').addClass('disabled');
        $('#record').removeClass('disabled');
        streamCtrl.player.play();
    }

    function streamAudio() {
        // $('#streamAudio').addClass('disabled');
        $('#record').removeClass('disabled');
        ws.send("start stream");
    }

    function playBuffer(buf) {
        var source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
        if (startTime == 0)
            startTime = context.currentTime + 0.1; // add 50ms latency to work well across systems
        source.start(startTime);
        startTime = startTime + source.buffer.duration;
    }

    function handleButtons() {
        $('#stop').addClass('disabled');
        $('#record').addClass('disabled');
        $('#byPlayer').addClass('disabled');
        // $('#streamAudio').addClass('disabled');
    }

    function createMediaRecorder() {
        if (navigator.getUserMedia) {
            console.log('getUserMedia supported.');

            var constraints = {
                "audio": true
            };

            var onSuccess = function(stream) {
                var options = {
                    audioBitsPerSecond : 128000,
                    mimeType : 'audio/webm'
                };
                mediaRecorder = new MediaRecorder(stream, options);
                console.log('Successfully added media recorder');
                $('#record').removeClass('disabled');
            };

            var onError = function(err) {
                console.log('The following error occured: ' + err);
            };

            navigator.getUserMedia(constraints, onSuccess, onError);

        } else {
            alert('getUserMedia not supported on your browser!');
        }
    }

    function init() {
        createWSConnection();
        handleButtons();
        createMediaRecorder();
    }
});
