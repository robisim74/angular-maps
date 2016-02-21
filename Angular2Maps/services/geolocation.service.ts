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
 * GeolocationService class.
 * https://developers.google.com/maps/documentation/javascript/
 * 
 * @author Roberto Simonetti
 */
@Injectable() export class GeolocationService {

    constructor() { }
    
    /**
     * Tries HTML5 geolocation.
     * 
     * Wrap the Geolocation API into an observable.
     */
    getCurrentPosition(): Observable<any> {

        return new Observable((observer: Observer<any>) => {

            // Invokes getCurrentPosition method of Geolocation API.
            navigator.geolocation.getCurrentPosition(
                
                // Success callback.
                (position: Position) => {

                    observer.next(position);
                    observer.complete();

                },
                
                // Error callback.
                (error: PositionError) => {

                    observer.error(error);

                }

            );

        });

    }

}