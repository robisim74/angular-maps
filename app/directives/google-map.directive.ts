import { Component, Input, OnInit, OnChanges, SimpleChange, ElementRef } from '@angular/core';

import { MapsService } from '../services/maps.service';

@Component({
    selector: 'google-map',
    template: `
        <div id="map"></div>
        <ng-content></ng-content>
        `
})
export class GoogleMapDirective implements OnInit, OnChanges {

    /**
     * Center map. Required.
     */
    @Input() center: google.maps.LatLng;

    /*
     * MapOptions object specification.
     */

    /**
     * The initial map zoom level. Required.
     */
    @Input() zoom: number;
    /**
     * Enables/disables all default UI.
     */
    @Input() disableDefaultUI: boolean;
    /**
     * Enables/disables zoom and center on double click. Enabled by default.
     */
    @Input() disableDoubleClickZoom: boolean;
    /**
     * The initial map mapTypeId. Defaults to ROADMAP.
     */
    @Input() mapTypeId: google.maps.MapTypeId;
    /**
     * The maximum zoom level which will be displayed on the map.
     */
    @Input() maxZoom: number;
    /**
     * The minimum zoom level which will be displayed on the map.
     */
    @Input() minZoom: number;
    /**
     * Styles to apply to each of the default map types.
     */
    @Input() styles: Array<google.maps.MapTypeStyle>;

    constructor(public maps: MapsService, private elementRef: ElementRef) { }

    /**
     * On init, creates map.
     */
    ngOnInit() {
        // Gets the map element.
        let el: HTMLElement = this.elementRef.nativeElement.querySelector('#map');

        this.createMap(el);
    }

    /**
     * On changes, updates center map & zoom.
     */
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['center']) { this.maps.setCenter(this.center); };
        if (changes['zoom']) { this.maps.setZoom(this.zoom); };
    }

    private createMap(el: HTMLElement) {
        this.maps.initMap(el, {
            center: this.center,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            mapTypeId: this.mapTypeId,
            maxZoom: <number>this.maxZoom,
            minZoom: <number>this.minZoom,
            styles: this.styles,
            zoom: <number>this.zoom
        });
    }

}
