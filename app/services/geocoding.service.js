/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */
System.register(['angular2/core', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1;
    var GeocodingService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            /**
             * GeocodingService class.
             * https://developers.google.com/maps/documentation/javascript/
             *
             * @author Roberto Simonetti
             */
            GeocodingService = (function () {
                function GeocodingService() {
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
                GeocodingService.prototype.geocode = function (latLng) {
                    var _this = this;
                    return new Observable_1.Observable(function (observer) {
                        // Invokes geocode method of Google Maps API geocoding.
                        _this.geocoder.geocode({ 'location': latLng }, (
                        // Results & status.
                        // Results & status.
                        function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                observer.next(results);
                                observer.complete();
                            }
                            else {
                                console.log('Geocoding service: geocoder failed due to: ' + status);
                                observer.error(status);
                            }
                        }));
                    });
                };
                /**
                 * Geocoding services.
                 *
                 * Wraps the Google Maps API geocoding service into an observable.
                 *
                 * @param address The address to be searched
                 * @return An observable of GeocoderResult
                 */
                GeocodingService.prototype.codeAddress = function (address) {
                    var _this = this;
                    return new Observable_1.Observable(function (observer) {
                        // Invokes geocode method of Google Maps API geocoding.
                        _this.geocoder.geocode({ 'address': address }, (
                        // Results & status.
                        // Results & status.
                        function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                observer.next(results);
                                observer.complete();
                            }
                            else {
                                console.log('Geocoding service: geocode was not successful for the following reason: ' + status);
                                observer.error(status);
                            }
                        }));
                    });
                };
                GeocodingService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GeocodingService);
                return GeocodingService;
            }());
            exports_1("GeocodingService", GeocodingService);
        }
    }
});
