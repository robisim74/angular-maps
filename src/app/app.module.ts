import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GoogleMapComponent } from '../app/components/google-map.component';
import { GoogleMapMarkerDirective } from '../app/directives/google-map-marker.directive';

import { MapService } from '../app/services/map.service';
import { GeolocationService } from '../app/services/geolocation.service';
import { GeocodingService } from '../app/services/geocoding.service';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        GoogleMapComponent,
        GoogleMapMarkerDirective
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        MapService,
        GeolocationService,
        GeocodingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
