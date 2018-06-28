import { Component } from '@angular/core';
import { PopoverController, AlertController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  public fileList : Array<string> = new Array<string>();

  constructor(public popoverCtrl: PopoverController, private electron : ElectronService, private alert : AlertController) {
    
    if(this.electron.isElectronApp){
      this.electron.ipcRenderer.on("getFileListResponse", (event, arg)=>{
        console.dir(event);
        console.dir(arg);

        this.fileList = arg;

        this.alert.create({
          title: "Dateiliste",
          message: "Dateiliste wurde aktualisiert.\n\n" + this.fileList.join(", ")
        }).present();
      });
    }

  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  public requestFiles()
  {
    if(this.electron.isElectronApp)
    {
      this.electron.ipcRenderer.send("getFileList");
    }
  }
}
