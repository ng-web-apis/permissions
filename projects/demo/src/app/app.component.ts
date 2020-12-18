import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {PermissionsService} from '@ng-web-apis/permissions';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        @Inject(PermissionsService) readonly permissionsService: PermissionsService,
    ) {}
}
