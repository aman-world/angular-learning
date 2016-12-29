app.controller('recordController', function ($rootScope, $location) {
    var recordCtrl = this;
    recordCtrl.startRecording = startRecording;
    recordCtrl.stopRecording = stopRecording;
    recordCtrl.player = new window.Audio();
    recordCtrl.audioUrl = '';
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    var context = new AudioContext();

    var mediaRecorder;
    var chunks = [];
    var startTime = 0;
    init();

    function init() {
        $('#stop').addClass('disabled');
        $('#record').addClass('disabled');
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

    function startRecording() {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        $('#record').addClass('disabled');
        $('#stop').removeClass('disabled');

        mediaRecorder.ondataavailable = function(e) {
            // console.log('ondataavailable: ', e.data);
            chunks.push(e.data);
        };
    }

    function stopRecording() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        $('#stop').addClass('disabled');
        $('#record').removeClass('disabled');
        mediaRecorder.onstop = function(e) {
            console.log("onstop() called.", e);


            var superBuffer = new Blob(chunks);
            recordCtrl.player.src = window.URL.createObjectURL(superBuffer);
            recordCtrl.player.play();
            chunks = [];

            /*var blob = new Blob(chunks, {
                'type': 'audio/mp3'
            });


             var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                console.log("reader.result", reader.result);
                context.decodeAudioData(reader.result, function(buffer) {
                        playSound(buffer);
                    },
                    function(e) {
                        console.log("error ", e)
                    });
            });
            reader.readAsArrayBuffer(blob);*/
        };
    }


    function playSound(buf) {
        var source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
        source.start(startTime);
        startTime = startTime + source.buffer.duration;
    }
});
