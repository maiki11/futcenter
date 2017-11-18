import { OnInit } from '@angular/core';
import {UploadService} from '../../upload/shared/upload.service'
import {Upload} from '../../upload/shared/upload'
export class Team {
    $key: string;
    title: string;
    dateCreated: number;
    active: boolean = true;
    players: [any] = [null];
    leagues: any[] = [];
    imageUrl: string;
    createdBy: string;
    constructor(){
        this.dateCreated =  new Date().getTime()
    }
}
