# Angular Maps

> Google Maps JavaScript API in Angular 2+ apps.

## Sample app

The sample application implements Google Maps, Markers, Geolocation and Geocoding. Optionally Autocomplete.

## Running locally the sample app

Make sure that you have the latest version of npm and Angular CLI:

```Shell
npm install -g npm@latest
npm install -g @angular/cli
```

In the command line, go to the root directory:

```Shell
npm install

ng serve
```

## Note

>Starting with Chrome 50, Chrome no longer supports obtaining the user's location using the HTML5 Geolocation API from pages delivered by non-secure connections. This means that the page that's making the Geolocation API call must be served from a secure context such as HTTPS: [Geolocation API Removed from Unsecured Origins in Chrome 50](https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only).
