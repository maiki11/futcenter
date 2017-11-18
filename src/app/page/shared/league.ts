export class League {
    $key: string;
    title: string;
    dateCreated: number;
    active: boolean = true;
    teamsQualifiers: number;
    tournamentId: string;
    teams: [any];
    journeys: any[];
    selected: boolean = false;
    constructor(){
        this.dateCreated =  new Date().getTime()
    }
}

