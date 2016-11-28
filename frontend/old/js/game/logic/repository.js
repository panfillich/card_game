let Repository = require('./repository');

class FrameRender {
    constructor(){
        this.repository = new Repository();
    }

    startEvents(){
        let events =  this.repository.preEvents;
        FrameRender.сallEvents(events);
    }

    mainEvents(){
        let events =  this.repository.mainEvents;
        FrameRender.сallEvents(events);
    }

    endEvents(){
        let events =  this.repository.endEvents;
        FrameRender.сallEvents(events);
    }

    //ASK - по возрастанию
    //DESK - по убыванию
    static сallEvents(events){
        events.forEach(function (event) {
            event();
        });
    }
}