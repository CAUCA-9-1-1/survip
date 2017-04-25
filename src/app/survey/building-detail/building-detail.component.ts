import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { WindowRefService } from '../../shared/window-ref.service';

@Component({
  selector: 'app-survey-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.styl']
})

export class BuildingDetailComponent implements OnInit {
  @Input() building: any;
  selectedDieMeasuring: string = '1';
  imageSrc= 'protocol.png';

  constructor(private elRef: ElementRef, private windowRef: WindowRefService) { }

  ngOnInit() {
  }

  takePicture(event) {
    if (this.windowRef.nativeWindow.cordova) {
      this.windowRef.nativeNavigator.camera.getPicture(this.onSuccess.bind(this), this.onFail.bind(this), {
        quality: 100
      });
    } else {
      alert('on browser');
    }
  }

  onSuccess(imageURI) {
    const image = this.elRef.nativeElement.querySelector('.buildingImage');

    image.src = "data:image/jpeg;base64," + imageURI;
  }

  onFail(message) {
    alert('Failed because: ' + message);
  }
}
