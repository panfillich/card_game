class FrameRender {

    constructor(){
        this.repository = {
            startEvents: [],
            mainEvents: [],
            endEvents: []
        }
    }



    //Cобытия отрабатывающие до прорисовки кадра
    startEvents(){
        let events =  this.repository.startEvents;
        FrameRender.сallEvents(events);
    }

    /*get startEvents() {
        return this.repository.startEvents;
    }*/

    addStartEvent(event){
        this.repository.startEvents.push(event);
    }



    //Прорисовка кадра
    mainEvents(){
        let events =  this.repository.mainEvents;
        FrameRender.сallEvents(events);
    }

    /*get mainEvents(){
        return this.repository.mainEvents;
    }*/

    addMainEvent(event){
        this.repository.mainEvents.push(event);
    }



    //События после прорисовки кадра
    endEvents(){
        let events =  this.repository.endEvents;
        FrameRender.сallEvents(events);
    }

    /*get endEvents(){
        return this.repository.endEvents;
    }*/

    addEndEvent(event){
        this.repository.endEvents.push(event);
    }


    //ASK - по возрастанию
    //DESK - по убыванию
    static сallEvents(events){
        events.forEach(function (event) {
                event();
        });
    }
}

module.exports = FrameRender;
