/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */
System.register(['angular2/core', 'rxjs/Observable'], function(exports_1) {
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
    var GeolocationService;
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
             * GeolocationService class.
             * https://developers.google.com/maps/documentation/javascript/
             * https://dev.w3.org/geo/api/spec-source.html
             *
             * @author Roberto Simonetti
             */
            GeolocationService = (function () {
                function GeolocationService() {
                }
                /**
                 * Tries HTML5 geolocation.
                 *
                 * Wraps the Geolocation API into an observable.
                 *
                 * @return An observable of Position
                 */
                GeolocationService.prototype.getCurrentPosition = function () {
                    return new Observable_1.Observable(function (observer) {
                        // Invokes getCurrentPosition method of Geolocation API.
                        navigator.geolocation.getCurrentPosition(
                        // Success callback.
                        function (position) {
                            observer.next(position);
                            observer.complete();
                        }, 
                        // Error callback.
                        function (error) {
                            console.log('Geolocation service: ' + error.message);
                            observer.error(error);
                        });
                    });
                };
                GeolocationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GeolocationService);
                return GeolocationService;
            })();
            exports_1("GeolocationService", GeolocationService);
        }
    }
});
