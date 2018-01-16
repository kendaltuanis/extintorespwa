import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const GEOLOCATION_ERRORS = {
    'errors.location.unsupportedBrowser': 'Browser does not support location services',
    'errors.location.permissionDenied': 'You have rejected access to your location',
    'errors.location.positionUnavailable': 'Unable to determine your location',
    'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GeolocationService {

    constructor() { }

    getLocation(): Observable<any> {
        return Observable.create(observer => {
            if(window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        observer.next(position);
                        observer.complete();
                    },
                   
                    (error) =>  alert(error.message)
                );
            } else {
                alert('Unsupported Browser');
            }
        });
    }

}
export let geolocationServiceInjectables: Array<any> = [
    { provide: GeolocationService, useClass: GeolocationService }
];



