
export const ELEVATOR_STATE = {
    WAITING: 0, // empty, waiting for instructions --> doors are open
    LOADING: 1, // loading people inside
    UNLOADING: 2, // unloading people
    DOOR_OPENING: 3,
    DOOR_CLOSING: 4,
    DOOR_OPENED: 5,
    DOOR_CLOSED: 6,
    MOVING: 7,
    MAX: 8
};

export const ELEVATOR_DIRECTION = {
    DOWN: -1,
    NONE: 0,
    UP: 1
}
