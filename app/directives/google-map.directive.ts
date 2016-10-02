/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */

import { Component, Input, OnInit, OnChanges, SimpleChange, ElementRef } from '@angular/core';
// Services.
import { MapsService } from '../services/maps.service';

@Component({
    selector: 'google-map',
    template: `
        <div id="map"></div>
        <ng-content></ng-content>
        `
})

/**
 * Google map directive.
 * 
 * Basic usage.
 * 
 * import {Component} from 'angular2/core';
 * // Directives.
 * import {GoogleMapDirective} from '../directives/google-map.directive';
 * import {GoogleMapMarkerDirective} from '../directives/google-map-marker.directive';
 * // Services.
 * import {MapsService} from '../services/maps.service';
 * 
 * @Component({
 *      selector: 'app-component',
 *      directives: [GoogleMapDirective, GoogleMapMarkerDirective],
 *      templateUrl: `
 *          <!--these properties are required: center, zoom-->
 *          <google-map [center]="center" 
 *                      [zoom]="zoom">
 *              <!--this property is required: position-->
 *              <google-map-marker [position]="position">
 *              </google-map-marker>
 *          </google-map>
 *          `,
 *      providers: [MapsService]
 * })
 * 
 * export class AppComponent {
 * 
 *      // Center map. Required.
 *      center: google.maps.LatLng;
 * 
 *      // MapOptions object specification.
 *      // The initial map zoom level. Required.
 *      zoom: number;
 * 
 *      // Marker position. Required.
 *      position: google.maps.LatLng;
 * 
 *      constructor(public maps: MapsService) {
 *          // Sets initial center map.
 *          this.center = new google.maps.LatLng(41.910943, 12.476358);    
 *          // Sets the initial zoom.
 *          this.zoom = 11;
 *          // Sets the marker position.
 *          this.position = this.center;
 *          ...
 *      }
 * }
 * 
 * @author Roberto Simonetti
 */
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
        var el: HTMLElement = this.elementRef.nativeElement.querySelector('#map');

        this.createMap(el);

    }

    /**
     * On changes, updates center map & zoom.
     */
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        if (changes['center']) { this.maps.setCenter(this.center); };
        if (changes['zoom']) { this.maps.setZoom(this.zoom); };

    }

    /**
     * Creates the map with the set properties.
     */
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
