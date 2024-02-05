import {Base} from "../shared/models/base.model"

export interface ContentModel extends Base{
    /* Employee Details */
    name : string;
    age? : number;
    gender : string;
    position : string;
    yearOfExperience : number;
    achievements?: string;
    joinedDate : number | any;
    resignDate? : number | any;
}