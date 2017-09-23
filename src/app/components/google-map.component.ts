import { Component, Input, OnInit, OnChanges, SimpleChange, ElementRef } from '@angular/core';

import { MapService } from '../services/map.service';

@Component({
    selector: 'google-map',
    template: `
        <div id="map"></div>
        <ng-content></ng-content>
        `
})
export class GoogleMapComponent implements OnInit, OnChanges {

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
    @Input() styles: google.maps.MapTypeStyle[];

    constructor(public map: MapService, private elementRef: ElementRef) { }

    /**
     * On init, creates map.
     */
    ngOnInit(): void {
        // Gets the map element.
        const el: HTMLElement = this.elementRef.nativeElement.querySelector('#map');

        this.createMap(el);
    }

    /**
     * On changes, updates center map & zoom.
     */
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['center']) { this.map.setCenter(this.center); }
        if (changes['zoom']) { this.map.setZoom(this.zoom); }
    }

    private createMap(el: HTMLElement): void {
        this.map.initMap(el, {
            center: this.center,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            mapTypeId: this.mapTypeId,
            maxZoom: this.maxZoom as number,
            minZoom: this.minZoom as number,
            styles: this.styles,
            zoom: this.zoom as number
        });
    }

}
