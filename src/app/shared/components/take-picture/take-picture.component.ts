import { Component, EventEmitter, ElementRef, OnInit, Input, Output, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';

import { WebcamComponent } from '../../../shared/components/webcam/webcam.component';
import { WindowRefService } from '../../../shared/services/window-ref.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.styl']
})
export class TakePictureComponent implements OnInit {
  @ViewChild('takePictureImage') imgRef: ElementRef;
  @ViewChild('fileLoader') inputRef: ElementRef;

  @Input() width = '300px';
  @Input() source = './assets/images/protocol.png';

  @Input()
  get horizontal(): boolean { return this._horizontal; }
  set horizontal(value: boolean) {
    this._horizontal = value;
    this.width = (value ? '100%' : this.width);
  }
  private _horizontal = false;

  @Input()
  get useCamera(): boolean { return this._useCamera; }
  set useCamera(value: boolean) {
    this._useCamera = value;
  }
  private _useCamera = true;

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private windowRef: WindowRefService, private dialog: MdDialog) { }

  ngOnInit() {
  }

  select(event) {
    if (this.windowRef.nativeWindow.cordova) {
      this.windowRef.nativeNavigator.camera.getPicture(this.onSuccess.bind(this), this.onFail.bind(this), {
        sourceType: this.windowRef.nativeWindow.Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.windowRef.nativeWindow.Camera.DestinationType.DATA_URL,
      });
    } else {
      this.inputRef.nativeElement.click();
    }
  }

  take(event) {
    if (this.windowRef.nativeWindow.cordova) {
      this.windowRef.nativeNavigator.camera.getPicture(this.onSuccess.bind(this), this.onFail.bind(this), {
        quality: 100,
        destinationType: this.windowRef.nativeWindow.Camera.DestinationType.DATA_URL,
      });
    } else {
      this.dialog.open(WebcamComponent);
    }
  }

  onChange(e) {
    const files = e.target.files;
    const reader = new FileReader();

    if (files.length) {
      reader.addEventListener('load', this.onSuccess.bind(this));
      reader.readAsDataURL(files[0]);
    }
  }

  onSuccess(imageURI) {
    if (this.windowRef.nativeWindow.cordova) {
      this.imgRef.nativeElement.src = 'data:image/jpeg;base64,' + imageURI;
    } else {
      this.imgRef.nativeElement.src = imageURI.target.result;
    }

    this.change.emit(this.imgRef.nativeElement.src);
  }

  onFail(message) {
    console.log('Failed because: ' + message);
  }
}
