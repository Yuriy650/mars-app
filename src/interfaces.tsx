export interface Camera {
    id: number;
    name: string;
    rover_id: number;
    full_name: string
}
export interface Rover {
    id: number;
    landing_date: string;
    launch_date: string;
    name: string;
    status: string
}
export interface Photos {
    camera: Camera;
    earth_date: string;
    id: number;
    img_src: string;
    rover: Rover;
    sol: number
}
export interface Search {
    rover: string;
    camera: string;
    sol: number
}
