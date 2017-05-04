import {Component, ElementRef, OnInit, Input, ViewChild} from '@angular/core';
import { WindowRefService } from '../../shared/window-ref.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.styl']
})
export class TakePictureComponent implements OnInit {
  @ViewChild('takePictureImage') imgRef: ElementRef;
  @ViewChild('fileLoader') inputRef: ElementRef;

  @Input() width = '200px';

  constructor(private windowRef: WindowRefService) { }

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
      alert('a venir');
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
  }

  onFail(message) {
    console.log('Failed because: ' + message);
  }
}
