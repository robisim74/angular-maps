import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
// Directives.
import {GoogleMapDirective} from '../directives/google-map.directive';
import {GoogleMapMarkerDirective} from '../directives/google-map-marker.directive';
// Services.
import {MapsService} from '../services/maps.service';
import {GeolocationService} from '../services/geolocation.service';
import {GeocodingService} from '../services/geocoding.service';

@Component({
    selector: 'app-component',
    directives: [GoogleMapDirective, GoogleMapMarkerDirective],
    templateUrl: './app/app.component.html',
    providers: [MapsService],
    viewProviders: [GeolocationService, GeocodingService]
})

export class AppComponent {
    
    // Center map. Required.
    center: google.maps.LatLng;
    
    // MapOptions object specification.
      
    // The initial map zoom level. Required.
    zoom: number;

    disableDefaultUI: boolean;
    disableDoubleClickZoom: boolean;
    mapTypeId: google.maps.MapTypeId;
    maxZoom: number;
    minZoom: number;
    styles: Array<google.maps.MapTypeStyle>;
    
    // Marker position. Required.
    position: google.maps.LatLng;
    
    // Marker title.
    title: string;
    
    // Info window.
    content: string;

    // Address to be searched.
    address: string;

    constructor(public maps: MapsService, private geolocation: GeolocationService, private geocoding: GeocodingService) {
        
        // Sets initial center map.
        this.center = new google.maps.LatLng(41.910943, 12.476358);
    
        // Sets the initial zoom.
        this.zoom = 4;
        
        // Other options.
        this.disableDefaultUI = true;
        this.disableDoubleClickZoom = false;
        this.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.maxZoom = 15;
        this.minZoom = 4;
        // Styled Maps: https://developers.google.com/maps/documentation/javascript/styling
        // You can use the Styled Maps Wizard: http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html 
        this.styles = [
            {
                featureType: 'landscape',
                stylers: [
                    { color: '#ffffff' }
                ]
            }
        ];
        
        // Initially the marker isn't set.

    }
    
    // Tries to get the current position.
    getCurrentPosition() {

        if (navigator.geolocation) {
            
            // Gets the current position.
            this.geolocation.getCurrentPosition().subscribe(

                // Observer or next.
                (position: Position) => {

                    if (this.center.lat() != position.coords.latitude && this.center.lng() != position.coords.longitude) {
                        
                        // Sets the new center map & zoom.
                        // New center object: triggers OnChanges.
                        this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        this.zoom = 11;

                        // Translates the location into address.
                        this.geocoding.geocode(this.center).subscribe(
                
                            // Observer or next.
                            (results: google.maps.GeocoderResult[]) => {

                                // Sets the marker to the center map.
                                this.setMarker(this.center, "Your locality", results[0].formatted_address);

                            },
            
                            // Error.
                            (status: google.maps.GeocoderStatus) => {

                                console.log('Geocoding service: Geocoder failed due to: ' + status);

                            },
                            
                            // Complete.
                            () => { console.log('Geocoding service: Completed.'); }

                        )

                    }

                },
                
                // Error.
                (error: PositionError) => {

                    var message: string = '';

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            message = 'Permission denied.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message = 'Position unavailable.';
                            break;
                        case error.TIMEOUT:
                            message = 'Position timeout.';
                            break;
                    }

                    console.log('Geolocation service: ' + message);
                },
                
                // Complete.
                () => { console.log('Geolocation service: Completed.'); }

            );

        } else {

            // Browser doesn't support geolocation.
            console.log('Geolocation service: Browser doesn\'t support geolocation.');
        }

    }

    // Searches the address. 
    search(address: string) {

        if (address != null) {

            // Converts the address into geographic coordinates.
            var source: Observable<any> = this.geocoding.codeAddress(address);

            var subscription: Subscription = source.subscribe(
                           
                // Observer or next.
                (results: google.maps.GeocoderResult[]) => {

                    if (!this.center.equals(results[0].geometry.location)) {
                        
                        // Sets the new center map & zoom.
                        // New center object: triggers OnChanges.                       
                        this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        this.zoom = 11;
                    
                        // Sets the marker to the center map.
                        this.setMarker(this.center, "Search result", results[0].formatted_address);

                    }

                },
            
                // Error.
                (status: google.maps.GeocoderStatus) => {

                    console.log('Geocoding service: Geocode was not successful for the following reason: ' + status);

                },

                // Complete.
                () => { console.log('Geocoding service: Completed.'); }

            );

            // The observer will stop listening to the observable for data,
            // because the source observable sequence has a longer life span than the observer.             
            setTimeout(() => {

                subscription.unsubscribe();
                
                // Clear the search string.
                this.address = "";

            }, 500);

        }

    }
        
    // Sets the marker & the info window.
    setMarker(latLng: google.maps.LatLng, title: string, content: string) {

        // Removes all markers.
        this.maps.deleteMarkers();

        // Sets the marker.
        this.position = latLng;
        this.title = title;
        // Sets the info window.
        this.content = content;

    }

}
