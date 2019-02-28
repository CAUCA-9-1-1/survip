import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {transform, Projection} from 'ol/proj';
import {defaults as defaultInteractions, MouseWheelZoom} from 'ol/interaction';
import {GeoJSON, Polygon, WKT} from 'ol/format';
import {Point} from 'ol/geom';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-geolocation',
    templateUrl: './geolocation.component.html',
    styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {
    @ViewChild('map') mapElement: ElementRef;
    @Output() valueChanged = new EventEmitter();
    @Input() readOnly: any;
    @Input()
    set limitTo(coordinates) {
        if (coordinates && this.originalLimitOfMap !== JSON.stringify(coordinates)) {
            const features = (new GeoJSON()).readFeatures(coordinates);

            this.originalLimitOfMap = JSON.stringify(coordinates);
            this.limitOfMap = features[0].getGeometry().transform('EPSG:4326', 'EPSG:3857');
        }
    }

    @Input()
    get value(): string {
        if (this.selectedCoordinates) {
            const coordinates = this.selectedCoordinates.getCoordinates();
            const point = new Point(transform(coordinates, 'EPSG:3857', 'EPSG:4326'));

            return (new WKT()).writeGeometry(point);
        }

        return '';
    }
    set value(coordinates: string) {
        if (coordinates && this.originalCoordinates !== coordinates) {
            this.originalCoordinates = coordinates;
            this.selectedCoordinates = (new WKT()).readGeometry(coordinates).transform('EPSG:4326', 'EPSG:3857');
        }
    }

    get coordinatesAsText(): string {
        if (this.selectedCoordinates) {
            const coordinates = transform(this.selectedCoordinates.getCoordinates(), 'EPSG:3857', 'EPSG:4326');

            return coordinates[1].toFixed(6) + ',' + coordinates[0].toFixed(6);
        }

        return '';
    }

    
    public popupIsVisible = false;
    public toolbarItems = [];

    private originalLimitOfMap: string;
    private originalCoordinates: string;
    private selectedCoordinates: Point;
    private limitOfMap: Polygon;
    private layerWithStreet: TileLayer;
    private view: View;
    private map: Map;

    public constructor(
        private translateService: TranslateService,
    ) {
        
    }

    public ngOnInit() {
        this.translateService.get(['locate']).subscribe(labels => {
            this.toolbarItems.push({
                widget: 'dxButton',
                location: 'center',
                options: {
                    disabled: this.readOnly,
                    text: labels['locate'],
                    onClick: () => this.onLocate()
                }
            });
        });
     }

    public openMap() {
        this.layerWithStreet = new TileLayer({
            source: new OSM()
        });

        this.popupIsVisible = true;
    }

    public centerMap() {
        document.getElementById('cursor').style.marginTop = (
            (((document.getElementById('map').offsetHeight - document.getElementById('cursor').offsetHeight)) / 2) + 'px'
        );
        document.getElementById('cursor').style.marginLeft = (
            (((document.getElementById('map').offsetWidth - document.getElementById('cursor').offsetWidth)) / 2) + 'px'
        );

        if (this.selectedCoordinates) {
            this.view.animate({
                center: this.selectedCoordinates.getCoordinates(),
                zoom: 19,
            });
        }
    }

    public createMap() {
        document.getElementById('map').innerHTML = '';

        this.view = new View({
            center: this.limitOfMap.getInteriorPoint().getCoordinates(),
            maxZoom: 19,
            minZoom: 6,
            zoom: 12,
            extent: this.limitOfMap.getExtent(),
        });

        this.map = new Map({
            layers: [
                this.layerWithStreet,
            ],
            target: 'map',
            interactions: defaultInteractions().extend([new MouseWheelZoom({
                useAnchor: false,
            })]),
            view: this.view,
        });
    }

    private onLocate() {
        this.selectedCoordinates = new Point(this.view.getCenter());
        this.valueChanged.emit(this.value);
        this.popupIsVisible = false;
    }
}
