
export const ELEVATOR_STATE = {
    WAITING: 0,
    LOADING: 1, // loading people inside
    UNLOADING: 2, // unloading people
    DOOR_OPENING: 3,
    DOOR_CLOSING: 4,
    DOOR_OPENED: 5, // simule le petit temps entre l'ouverture complete des portes et le deplacement des passagers
    DOOR_CLOSED: 6, // simule le petit temps entre la fermeture complete des portes et le depart de l'ascenceur
    MOVING: 7,
    MAX: 8
};

export const ELEVATOR_DIRECTION = {
    DOWN: -1,
    NONE: 0,
    UP: 1
}
