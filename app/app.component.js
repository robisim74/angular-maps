System.register(['angular2/core', '../app/directives/google-map.directive', '../app/directives/google-map-marker.directive', '../app/services/maps.service', '../app/services/geolocation.service', '../app/services/geocoding.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, google_map_directive_1, google_map_marker_directive_1, maps_service_1, geolocation_service_1, geocoding_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (google_map_directive_1_1) {
                google_map_directive_1 = google_map_directive_1_1;
            },
            function (google_map_marker_directive_1_1) {
                google_map_marker_directive_1 = google_map_marker_directive_1_1;
            },
            function (maps_service_1_1) {
                maps_service_1 = maps_service_1_1;
            },
            function (geolocation_service_1_1) {
                geolocation_service_1 = geolocation_service_1_1;
            },
            function (geocoding_service_1_1) {
                geocoding_service_1 = geocoding_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(maps, geolocation, geocoding) {
                    this.maps = maps;
                    this.geolocation = geolocation;
                    this.geocoding = geocoding;
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
                    this.warning = false;
                    this.message = "";
                }
                // Tries to get the current position.
                AppComponent.prototype.getCurrentPosition = function () {
                    var _this = this;
                    this.warning = false;
                    this.message = "";
                    if (navigator.geolocation) {
                        // Gets the current position.
                        this.geolocation.getCurrentPosition().forEach(
                        // Next.
                        function (position) {
                            if (_this.center.lat() != position.coords.latitude && _this.center.lng() != position.coords.longitude) {
                                // Sets the new center map & zoom.
                                // New center object: triggers OnChanges.
                                _this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                _this.zoom = 11;
                                // Translates the location into address.
                                _this.geocoding.geocode(_this.center).forEach(
                                // Next.
                                function (results) {
                                    // Sets the marker to the center map.
                                    _this.setMarker(_this.center, "your locality", results[0].formatted_address);
                                }, null).then(function () { return console.log('Geocoding service: completed.'); });
                            }
                        }, null).then(function () { return console.log('Geolocation service: completed.'); }).catch(function (error) {
                            if (error.code > 0) {
                                switch (error.code) {
                                    case error.PERMISSION_DENIED:
                                        _this.message = 'permission denied';
                                        break;
                                    case error.POSITION_UNAVAILABLE:
                                        _this.message = 'position unavailable';
                                        break;
                                    case error.TIMEOUT:
                                        _this.message = 'position timeout';
                                        break;
                                }
                                _this.warning = true;
                            }
                        });
                    }
                    else {
                        // Browser doesn't support geolocation.
                        this.message = "browser doesn't support geolocation";
                        this.warning = true;
                    }
                };
                // Searches the address. 
                AppComponent.prototype.search = function (address) {
                    var _this = this;
                    if (address != "") {
                        this.warning = false;
                        this.message = "";
                        // Converts the address into geographic coordinates.
                        this.geocoding.codeAddress(address).forEach(
                        // Next.
                        function (results) {
                            if (!_this.center.equals(results[0].geometry.location)) {
                                // Sets the new center map & zoom.
                                // New center object: triggers OnChanges.                       
                                _this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                _this.zoom = 11;
                                // Sets the marker to the center map.
                                _this.setMarker(_this.center, "search result", results[0].formatted_address);
                            }
                        }, null).then(function () {
                            // Clears the search string.
                            _this.address = "";
                            console.log('Geocoding service: completed.');
                        }).catch(function (status) {
                            // Zero results.
                            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                                _this.message = "zero results";
                                _this.warning = true;
                            }
                        });
                    }
                };
                // Sets the marker & the info window.
                AppComponent.prototype.setMarker = function (latLng, title, content) {
                    // Removes all markers.
                    this.maps.deleteMarkers();
                    // Sets the marker.
                    this.position = latLng;
                    this.title = title;
                    // Sets the info window.
                    this.content = content;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app-component',
                        directives: [google_map_directive_1.GoogleMapDirective, google_map_marker_directive_1.GoogleMapMarkerDirective],
                        templateUrl: './app/app.component.html',
                        providers: [maps_service_1.MapsService],
                        viewProviders: [geolocation_service_1.GeolocationService, geocoding_service_1.GeocodingService]
                    }), 
                    __metadata('design:paramtypes', [maps_service_1.MapsService, geolocation_service_1.GeolocationService, geocoding_service_1.GeocodingService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
