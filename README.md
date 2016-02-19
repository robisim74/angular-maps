# Angular 2 Maps
> Google Maps JavaScript API in the new Angular 2 applications using TypeScript.
> With a sample application that implements the Geolocation and Geocoding.

## Basic usage.
Angular 2 maps includes the `google-map` and `google-map-marker` directives for viewing the map and markers, and the injectable class `maps`.

This is an example of basic use:
```TypeScript
import {Component} from 'angular2/core';
// Directives.
import {GoogleMapDirective} from '../directives/google-map.directive';
import {GoogleMapMarkerDirective} from '../directives/google-map-marker.directive';
// Services.
import {MapsService} from '../services/maps.service';
 
@Component({
     selector: 'app-component',
     directives: [GoogleMapDirective, GoogleMapMarkerDirective],
     templateUrl: `
         <!--these properties are required: center, zoom-->
         <google-map [center]="center" 
                     [zoom]="zoom">
             <!--this property is required: position-->
             <google-map-marker [position]="position">
             </google-map-marker>
         </google-map>
         `,
     providers: [MapsService]
})

export class AppComponent {

     // Center map. Required.
     center: google.maps.LatLng;

     // MapOptions object specification.
     // The initial map zoom level. Required.
     zoom: number;

     // Marker position. Required.
     position: google.maps.LatLng;

     constructor(public maps: MapsService) {
         // Sets initial center map.
         this.center = new google.maps.LatLng(41.910943, 12.476358);    
         // Sets the initial zoom.
         this.zoom = 11;
         // Sets the marker position.
         this.position = this.center;
         ...
     }
}
```
You must also include in your application:
- these directives and services folders;
- the Google Maps API load;
- `googlemaps` TypeScript definition.

## Running the sample app
What you need to run this app:
- this repository;
- [Node and npm](https://nodejs.org), [Typings](https://github.com/typings/typings) already installed.

In the command-prompt, go to the directory that contains `index.html`:
```
npm install

typings install

npm install -g lite-server
lite-server
```
and then in a browser, visit `localhost:3000/index.html`.