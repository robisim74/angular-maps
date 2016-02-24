/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */
System.register(['angular2/core', '../services/maps.service'], function(exports_1) {
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
    var GoogleMapDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (maps_service_1_1) {
                maps_service_1 = maps_service_1_1;
            }],
        execute: function() {
            GoogleMapDirective = (function () {
                function GoogleMapDirective(maps, elementRef) {
                    this.maps = maps;
                    this.elementRef = elementRef;
                }
                /**
                 * On init, creates map.
                 */
                GoogleMapDirective.prototype.ngOnInit = function () {
                    // Gets the map element.
                    var el = this.elementRef.nativeElement.querySelector('#map');
                    this.createMap(el);
                };
                /**
                 * On changes, updates center map & zoom.
                 */
                GoogleMapDirective.prototype.ngOnChanges = function (changes) {
                    if (changes['center']) {
                        this.maps.setCenter(this.center);
                    }
                    ;
                    if (changes['zoom']) {
                        this.maps.setZoom(this.zoom);
                    }
                    ;
                };
                /**
                 * Creates the map with the set properties.
                 */
                GoogleMapDirective.prototype.createMap = function (el) {
                    this.maps.initMap(el, {
                        center: this.center,
                        disableDefaultUI: this.disableDefaultUI,
                        disableDoubleClickZoom: this.disableDoubleClickZoom,
                        mapTypeId: this.mapTypeId,
                        maxZoom: this.maxZoom,
                        minZoom: this.minZoom,
                        styles: this.styles,
                        zoom: this.zoom
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', google.maps.LatLng)
                ], GoogleMapDirective.prototype, "center", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], GoogleMapDirective.prototype, "zoom", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], GoogleMapDirective.prototype, "disableDefaultUI", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], GoogleMapDirective.prototype, "disableDoubleClickZoom", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], GoogleMapDirective.prototype, "mapTypeId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], GoogleMapDirective.prototype, "maxZoom", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], GoogleMapDirective.prototype, "minZoom", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], GoogleMapDirective.prototype, "styles", void 0);
                GoogleMapDirective = __decorate([
                    core_1.Component({
                        selector: 'google-map',
                        template: "\n        <div id=\"map\"></div>\n        <ng-content></ng-content>\n        "
                    }), 
                    __metadata('design:paramtypes', [maps_service_1.MapsService, core_1.ElementRef])
                ], GoogleMapDirective);
                return GoogleMapDirective;
            })();
            exports_1("GoogleMapDirective", GoogleMapDirective);
        }
    }
});
