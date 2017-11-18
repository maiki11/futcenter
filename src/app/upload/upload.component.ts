import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {UploadService} from './shared/upload.service'
import {Upload} from './shared/upload'
import * as _ from "lodash";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  currentUpload: Upload;

  @Output() fileEmit = new EventEmitter()
  selectedFiles: FileList;
  constructor(private upSvc:UploadService) { }

  ngOnInit() {
  }
  detectFiles(event){
    this.selectedFiles = event.target.files;
  }
  uploadSingle(){
    let file =this.selectedFiles.item(0)
    this.currentUpload = new Upload(file)

    this.upSvc.pushUpload(this.currentUpload, (file) => {
        if (file.$key ) {
         this.fileEmit.emit(file)
        }
    })


  }

}
