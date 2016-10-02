/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */

import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

/**
 * GeocodingService class.
 * https://developers.google.com/maps/documentation/javascript/
 * 
 * @author Roberto Simonetti
 */
@Injectable() export class GeocodingService {

    /**
     * Geocoder.
     */
    geocoder: google.maps.Geocoder;

    constructor() {

        this.geocoder = new google.maps.Geocoder();

    }

    /**
     * Reverse geocoding by location.
     * 
     * Wraps the Google Maps API geocoding service into an observable.
     * 
     * @param latLng Location
     * @return An observable of GeocoderResult
     */
    geocode(latLng: google.maps.LatLng): Observable<google.maps.GeocoderResult[]> {

        return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'location': latLng }, (

                // Results & status.
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {

                    if (status === google.maps.GeocoderStatus.OK) {

                        observer.next(results);
                        observer.complete();

                    } else {

                        console.log('Geocoding service: geocoder failed due to: ' + status);

                        observer.error(status);

                    }

                })

            );

        });

    }

    /**
     * Geocoding services.
     * 
     * Wraps the Google Maps API geocoding service into an observable.
     * 
     * @param address The address to be searched
     * @return An observable of GeocoderResult
     */
    codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {

        return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'address': address }, (

                // Results & status.
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {

                    if (status === google.maps.GeocoderStatus.OK) {

                        observer.next(results);
                        observer.complete();

                    } else {

                        console.log('Geocoding service: geocode was not successful for the following reason: ' + status);

                        observer.error(status);

                    }

                })

            );

        });

    }

}
