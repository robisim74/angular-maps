/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */
System.register(['angular2/core', '../services/maps.service'], function(exports_1, context_1) {
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
    var core_1, maps_service_1;
    var GoogleMapMarkerDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (maps_service_1_1) {
                maps_service_1 = maps_service_1_1;
            }],
        execute: function() {
            GoogleMapMarkerDirective = (function () {
                function GoogleMapMarkerDirective(maps) {
                    this.maps = maps;
                }
                /**
                 * This method is invoked when the marker properties change.
                 */
                GoogleMapMarkerDirective.prototype.ngOnChanges = function (changes) {
                    // Creates the marker and the info window.
                    if (changes['position']) {
                        this.maps.addMarker(this.position, this.title, this.content);
                    }
                    ;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', google.maps.LatLng)
                ], GoogleMapMarkerDirective.prototype, "position", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], GoogleMapMarkerDirective.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], GoogleMapMarkerDirective.prototype, "content", void 0);
                GoogleMapMarkerDirective = __decorate([
                    core_1.Directive({
                        selector: 'google-map-marker'
                    }), 
                    __metadata('design:paramtypes', [maps_service_1.MapsService])
                ], GoogleMapMarkerDirective);
                return GoogleMapMarkerDirective;
            }());
            exports_1("GoogleMapMarkerDirective", GoogleMapMarkerDirective);
        }
    }
});
