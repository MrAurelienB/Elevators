import {ELEVATOR_STATE} from "../elm/elm.js";

export class ElevatorImage {
    constructor(){
        this.image = new Image();
        this.image.src = './resources/images/elevator_doors_3.jpg';
        this.image.addEventListener('load', (e) => {});

        const imgX = 168; // 20 // 313
        this.rects = [
            {x:imgX, y:0, w:95, h:90},
            {x:imgX, y:98, w:95, h:90},
            {x:imgX, y:196, w:95, h:90},
            {x:imgX, y:294, w:95, h:90}
        ]
    }

    draw(ctx, x, y, w, h, state, moreThanHalf){
        const rect = (() => {
            if (state == ELEVATOR_STATE.DOOR_CLOSED || state == ELEVATOR_STATE.MOVING || state == ELEVATOR_STATE.WAITING)
                return this.rects[0];
            if (state == ELEVATOR_STATE.DOOR_OPENED)
                return this.rects[3];
            if (state == ELEVATOR_STATE.DOOR_CLOSING)
                return moreThanHalf ? this.rects[1] : this.rects[2];
            if (state == ELEVATOR_STATE.DOOR_OPENING)
                return moreThanHalf ? this.rects[2] : this.rects[1];
            return this.rects[0];
        })();
        ctx.drawImage(this.image, rect.x, rect.y, rect.w, rect.h, x, y, w, h);
    }
}; // class ElevatorImage