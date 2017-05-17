import {
  Component, EventEmitter, ElementRef, OnInit, Input, Output,
  ViewChild, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MdDialog} from '@angular/material';

import {WebcamComponent} from '../../../shared/components/webcam/webcam.component';
import {WindowRefService} from '../../../shared/services/window-ref.service';
import {CordovaService} from '../../services/cordova.service';
import {DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.styl'],
  providers: [
    CordovaService, {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TakePictureComponent),
      multi: true
    }
  ]
})
export class TakePictureComponent implements OnInit, ControlValueAccessor {
  @ViewChild('takePictureImage') imgRef: ElementRef;
  @ViewChild('fileLoader') inputRef: ElementRef;

  @Input() width = '300px';
  @Input()
  get source(): string { return this._source; }
  set source(value: string) {
    this._source = value;
    this.onChange(value);
    this.onTouched(value);
  }
  private _source = '';

  @Input()
  get horizontal(): boolean { return this._horizontal; }
  set horizontal(value: boolean) {
    this._horizontal = value;
    this.width = (value ? '100%' : this.width);
  }
  private _horizontal = false;

  @Input()
  get allowCamera(): boolean { return this._allowCamera; }
  set allowCamera(value: boolean) {
    this._allowCamera = value;
  }
  private _allowCamera = true;

  @Input()
  get allowImageSelection(): boolean { return this._allowImageSelection; }
  set allowImageSelection(value: boolean) {
    this._allowImageSelection = value;
  }
  private _allowImageSelection = true;

  @Output() beforeChange = new EventEmitter();
  @Output() change = new EventEmitter();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
    private windowRef: WindowRefService,
    private cordova: CordovaService,
    private dialog: MdDialog,
    private dialogService: DialogsService,
  ) {
    if (!this.cordova.isActive) {
      this.allowCamera = false;
    }
  }

  writeValue(value: any) {
    this.source = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  ngOnInit() {
  }

  onSelect(e) {
    e.preventDefault();

    this.beforeChange.emit(e);

    if (this.cordova.isActive) {
      this.cordova.plugins.camera.getPicture(this.onSuccess.bind(this), this.onFail.bind(this), {
        sourceType: this.cordova.plugins.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: (this.cordova.osVersion > 5 ?
            this.cordova.plugins.camera.DestinationType.DATA_URL :
            this.cordova.plugins.camera.DestinationType.FILE_URL
        )
      });
    } else {
      this.inputRef.nativeElement.click();
    }
  }

  onTake(e) {
    e.preventDefault();

    this.beforeChange.emit(e);

    if (this.cordova.isActive) {
      this.cordova.plugins.camera.getPicture(this.onSuccess.bind(this), this.onFail.bind(this), {
        quality: 100,
        destinationType: (this.cordova.osVersion > 5 ?
          this.cordova.plugins.camera.DestinationType.DATA_URL :
          this.cordova.plugins.camera.DestinationType.FILE_URL
        )
      });
    } else {
      this.dialog.open(WebcamComponent);
    }
  }

  onSelectFile(e) {
    const files = e.target.files;
    const reader = this.windowRef.nativeClass('FileReader');

    this.dialogService.wait();

    if (files.length) {
      reader.addEventListener('load', this.onSuccess.bind(this));
      reader.readAsDataURL(files[0]);
    }

    this.dialogService.close();
  }

  onSuccess(imageURI) {
    this.dialogService.wait();

    if (this.cordova.isActive) {
      this.imgRef.nativeElement.src = (imageURI.indexOf('file://') === 0 ? '' : 'data:image/jpeg;base64,') + imageURI;
    } else {
      this.imgRef.nativeElement.src = imageURI.target.result;
    }
  }

  onFail(message) {
    console.log(message);
  }

  public onLoadSource(e) {
    let base64Image = this.imgRef.nativeElement.src;

    if (base64Image.indexOf('data:image/') === -1) {
      base64Image = this.getBase64Image();
    }

    this.onChange(base64Image);
    this.change.emit(this.imgRef.nativeElement.src);

    if (this.dialogService) {
      this.dialogService.close();
    }
  }

  private getBase64Image(): string {
    const canvas = this.windowRef.nativeDocument.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = this.imgRef.nativeElement.width;
    canvas.height = this.imgRef.nativeElement.height;
    ctx.drawImage(this.imgRef.nativeElement, 0, 0);

    return canvas.toDataURL('image/jpeg');
  }
}
