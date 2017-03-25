import { Injectable } from '@angular/core';

/**
 * MapsService class.
 * 
 * This injectable class instances the map & the markers.
 * Its methods are used by the directives and can be used by a component.
 */
@Injectable() export class MapsService {

    private map: google.maps.Map;

    private markers: Array<google.maps.Marker> = [];

    constructor() { }

    /**
     * Creates a new map inside of the given HTML container.
     * 
     * @param el DIV element
     * @param mapOptions MapOptions object specification
     */
    initMap(el: HTMLElement, mapOptions: any) {
        this.map = new google.maps.Map(el, mapOptions);

        // Adds event listener resize when the window changes size.
        window.addEventListener("resize", () => { this.resize(); });
    }

    setCenter(latLng: google.maps.LatLng) {
        if (this.map != null && latLng != null) {
            // Changes the center of the map to the given LatLng.
            this.map.panTo(latLng);
        }
    }

    setZoom(zoom: number) {
        if (this.map != null) {
            this.map.setZoom(zoom);
        }
    }

    /**
     * Adds a marker.
     * 
     * @param latLng Marker position
     * @param title Tooltip
     * @param contentString InfoWindow' content
     */
    addMarker(latLng: google.maps.LatLng, title?: string, contentString?: string) {
        if (this.map != null && latLng != null) {
            // Creates the marker.
            let marker = new google.maps.Marker({
                position: latLng,
                title: title
            });
            // Adds the marker to the map.
            marker.setMap(this.map);
            // Creates the info window if required.
            if (contentString != null) {
                // Sets the max width of the info window to the width of the map element.
                let width: number = this.map.getDiv().clientWidth;
                let infoWindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: width
                });
                // Makes the info window visible.
                marker.addListener('click', function () {
                    infoWindow.open(this.map, marker);
                });
            }

            // Pushes it to the markers array.
            this.markers.push(marker);
        }
    }

    deleteMarkers() {
        // Removes the markers from the map.
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        // Removes references to them.
        this.markers = [];
    }

    private resize() {
        // Saves the center.
        let latLng: google.maps.LatLng = this.map.getCenter();
        // Triggers resize event.
        google.maps.event.trigger(this.map, "resize");
        // Restores the center.
        this.map.setCenter(latLng);
    }

}
