app.service('sessionService', function () {
    var service = this;
    service.sessionId = null;
    service.setSessionId = setSessionId;
    service.getSessionId = getSessionId;
    service.removeSessionId = removeSessionId;

    function setSessionId(sessionId) {
        return localStorage.setItem('sessionId', sessionId);
    }

    function getSessionId() {
       return localStorage.getItem('sessionId');
    }

    function removeSessionId() {
        return localStorage.removeItem('sessionId');
    }
});