/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */

import { Directive, Input, OnChanges, SimpleChange } from '@angular/core';
// Services.
import { MapsService } from '../services/maps.service';

@Directive({
    selector: 'google-map-marker'
})

/**
 * Google map marker directive.
 * 
 * @author Roberto Simonetti
 */
export class GoogleMapMarkerDirective implements OnChanges {

    /**
     * Marker position. Required.
     */
    @Input() position: google.maps.LatLng;

    /**
     * The marker's title will appear as a tooltip.
     */
    @Input() title: string;

    /**
     * An InfoWindow's content is diplayed in a popup window above the map, at a given location.
     */
    @Input() content: string;

    constructor(public maps: MapsService) { }

    /**
     * This method is invoked when the marker properties change.
     */
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        // Creates the marker and the info window.
        if (changes['position']) { this.maps.addMarker(this.position, this.title, this.content); };

    }

}
