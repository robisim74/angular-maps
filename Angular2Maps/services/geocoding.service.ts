/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */

import {Injectable} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

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
     */
    geocode(latLng: google.maps.LatLng): Observable<any> {

        return new Observable((observer: Observer<any>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'location': latLng }, (
                          
                // Results.
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {

                    if (status === google.maps.GeocoderStatus.OK) {

                        observer.next(results);
                        observer.complete();

                    } else {

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
     */
    codeAddress(address: string): Observable<any> {

        return new Observable((observer: Observer<any>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'address': address }, (
                          
                // Results.
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {

                    if (status === google.maps.GeocoderStatus.OK) {

                        observer.next(results);
                        observer.complete();

                    } else {

                        observer.error(status);

                    }

                })

            );

        });

    }

}

