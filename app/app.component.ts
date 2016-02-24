import {Component} from 'angular2/core';
// Directives.
import {GoogleMapDirective} from '../app/directives/google-map.directive';
import {GoogleMapMarkerDirective} from '../app/directives/google-map-marker.directive';
// Services.
import {MapsService} from '../app/services/maps.service';
import {GeolocationService} from '../app/services/geolocation.service';
import {GeocodingService} from '../app/services/geocoding.service';

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

    // Flag for zero results found.
    zeroResults: boolean;

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

        // Clears the search string.
        this.address = "";

        this.zeroResults = false;

    }
    
    // Tries to get the current position.
    getCurrentPosition() {

        if (navigator.geolocation) {
            
            // Gets the current position.
            this.geolocation.getCurrentPosition().forEach(

                // Next.
                (position: Position) => {

                    if (this.center.lat() != position.coords.latitude && this.center.lng() != position.coords.longitude) {
                        
                        // Sets the new center map & zoom.
                        // New center object: triggers OnChanges.
                        this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        this.zoom = 11;

                        // Translates the location into address.
                        this.geocoding.geocode(this.center).forEach(
                
                            // Next.
                            (results: google.maps.GeocoderResult[]) => {

                                // Sets the marker to the center map.
                                this.setMarker(this.center, "Your locality", results[0].formatted_address);

                            }, null

                        ).then(() => console.log('Geocoding service: completed.'));

                    }

                }, null

            ).then(() => console.log('Geolocation service: completed.'));

        } else {

            // Browser doesn't support geolocation.
            console.log('Geolocation service: browser doesn\'t support geolocation.');
        }

    }

    // Searches the address. 
    search(address: string) {

        if (address != null) {

            this.zeroResults = false;

            // Converts the address into geographic coordinates.
            this.geocoding.codeAddress(address).forEach(

                // Next.
                (results: google.maps.GeocoderResult[]) => {

                    if (!this.center.equals(results[0].geometry.location)) {
                        
                        // Sets the new center map & zoom.
                        // New center object: triggers OnChanges.                       
                        this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        this.zoom = 11;
                    
                        // Sets the marker to the center map.
                        this.setMarker(this.center, "Search result", results[0].formatted_address);

                    }

                }, null

            ).then(

                () => {
                
                    // Clears the search string.
                    this.address = "";

                    console.log('Geocoding service: completed.');

                }

                ).catch(

                (status: google.maps.GeocoderStatus) => {

                    if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {

                        this.zeroResults = true;

                    }

                });

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
