import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {NAVIGATOR} from '@ng-web-apis/common';
import {PermissionsService} from '@ng-web-apis/permissions';
import {BehaviorSubject, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SAMPLE} from './samples/basic';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    error$ = new BehaviorSubject<string | null>(null);
    basicSample = SAMPLE;

    geolocationState$ = this.permissionsService.state('geolocation').pipe(
        tap(state => {
            if (state === 'prompt') {
                alert(
                    'After you acknowledge this message the browser will ask your permission to allow location access!',
                );
                // calling getCurrentPosition() results in a browser asking for permission if the current status is "prompt"
                this.navigator.geolocation.getCurrentPosition(() => {});
            }
        }),
        catchError((error: Error) => {
            this.error$.next(error.message);

            return of(null);
        }),
    );

    constructor(
        private readonly permissionsService: PermissionsService,
        @Inject(NAVIGATOR) private navigator: Navigator,
    ) {}
}
