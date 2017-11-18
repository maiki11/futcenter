//import { Team } from '../../team/shared/team';
export class Match {
    $key:string;
    team1:any;
    team2:any;
    league: string;
    referi:string;
    stadium:string;
    startDate:number;
    endDate:number;
    done:Boolean=false;
    footballDay: any;
    result1: number = 0;
    result2: number = 0;
}
