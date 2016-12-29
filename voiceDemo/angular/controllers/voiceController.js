app.controller('voiceController', function ($rootScope, $location) {
    var voiceCtrl = this;
    voiceCtrl.createWSConnection = createWSConnection;
    voiceCtrl.closeWSConnection = closeWSConnection;
    voiceCtrl.startStreaming = startStreaming;

    var context;
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

    function startStreaming() {
        // $('#startStreaming').addClass('disabled');
        ws.send("start streaming");
    }

    ws.onmessage = function(message) {
        console.log("in this", message.data);
        if (message.data instanceof ArrayBuffer) {
            console.log("in arrayBuffer", message.data);
            context.decodeAudioData(message.data, function(soundBuffer){
                playBuffer(soundBuffer);
            },function(x) {
                console.log("decoding failed", x)
            });
        } else {
        }
    };

    function playBuffer(buf) {
        var source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
        source.start(startTime);
        startTime = startTime + source.buffer.duration;
    }

    function init() {
        createWSConnection();
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }

    }
});


/*
// Without streaming voice example
app.controller('voiceController', function ($rootScope, $location) {
    var voiceCtrl = this;
    voiceCtrl.createWSConnection = createWSConnection;
    voiceCtrl.sendMessage = sendMessage;
    voiceCtrl.audioChunks = [];
    voiceCtrl.player = new window.Audio();
    var ws = null;
    var context;
    window.AudioContext = window.AudioContext|| window.webkitAudioContext;
    context = new AudioContext();
    init();

    function createWSConnection() {
        var url = "ws://localhost:3000/user/id=" + Date.now().toString();
        ws = new WebSocket(url);

        ws.onopen = function(){
            alert("Socket has been opened!");
        };
    }

    function sendMessage() {
        ws.send(voiceCtrl.message);
    }

    ws.onmessage = function(message) {
        console.log(typeof message.data);
        if(message.type === 'binary') {
            console.log("in binary");
        } else {
            console.log("in else", message);
            voiceCtrl.player.src = window.URL.createObjectURL(message.data);
            voiceCtrl.player.play();
        }
    };

    ws.onclose = function(message) {
        alert('Socket has been closed');
    };

    function init() {
        createWSConnection();
    }

});*/
