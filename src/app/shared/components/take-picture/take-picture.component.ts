import {
  Component, EventEmitter, ElementRef, OnInit, Input, Output,
  ViewChild, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MdDialog} from '@angular/material';

import {WebcamComponent} from '../../../shared/components/webcam/webcam.component';
import {WindowRefService} from '../../../shared/services/window-ref.service';
import {CordovaService} from '../../services/cordova.service';

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
    private cordovaRef: CordovaService,
    private windowRef: WindowRefService,
    private dialog: MdDialog
  ) {
    if (!this.cordovaRef.isActive) {
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

  select(e) {
    e.preventDefault();

    this.beforeChange.emit(e);

    if (this.cordovaRef.isActive) {
      this.cordovaRef.success = this.onSuccess.bind(this);
      this.cordovaRef.execute('camera', 'getPicture', {
        sourceType: this.windowRef.nativeWindow.Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.windowRef.nativeWindow.Camera.DestinationType.DATA_URL,
      });
    } else {
      this.inputRef.nativeElement.click();
    }
  }

  take(e) {
    e.preventDefault();

    this.beforeChange.emit(e);

    if (this.windowRef.nativeWindow.cordova) {
      this.cordovaRef.success = this.onSuccess.bind(this);
      this.cordovaRef.execute('camera', 'getPicture', {
        quality: 100,
        destinationType: this.windowRef.nativeWindow.Camera.DestinationType.DATA_URL,
      });
    } else {
      this.dialog.open(WebcamComponent);
    }
  }

  onSelectFile(e) {
    const files = e.target.files;
    const reader = this.windowRef.nativeClass('FileReader');

    if (files.length) {
      reader.addEventListener('load', this.onSuccess.bind(this));
      reader.readAsDataURL(files[0]);
    }
  }

  onSuccess(imageURI) {
    if (this.cordovaRef.isActive) {
      this.imgRef.nativeElement.src = 'data:image/jpeg;base64,' + imageURI;
    } else {
      this.imgRef.nativeElement.src = imageURI.target.result;
    }

    this.onChange(this.imgRef.nativeElement.src);
    this.change.emit(this.imgRef.nativeElement.src);

    dialogRef.close();
  }
}
