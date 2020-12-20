import {Inject, Injectable} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {shareReplay, takeUntil} from 'rxjs/operators';
import {PERMISSIONS} from '../tokens/permissions';
import {PERMISSIONS_SUPPORT} from '../tokens/permissions-support';

export type PermissionsQueryArgs = Parameters<typeof Permissions.prototype.query>[0];

@Injectable({
    providedIn: 'root',
})
export class PermissionsService {
    constructor(
        @Inject(PERMISSIONS) private readonly permissions: Permissions,
        @Inject(PERMISSIONS_SUPPORT) private permissionsSupported: boolean,
    ) {}

    state(name: PermissionName): Observable<PermissionState>;
    state(descriptor: PermissionsQueryArgs): Observable<PermissionState>;
    state(
        nameOrDescriptor: PermissionName | PermissionsQueryArgs,
    ): Observable<PermissionState> {
        const descriptor: PermissionDescriptor =
            typeof nameOrDescriptor === 'string'
                ? {name: nameOrDescriptor}
                : nameOrDescriptor;

        return new Observable<PermissionState>(subscriber => {
            if (!this.permissionsSupported) {
                subscriber.error('Permissions is not supported in your browser');

                return;
            }

            let permissionStatus: PermissionStatus | undefined;

            function onChange(this: PermissionStatus) {
                subscriber.next(this.state);
            }

            const destroy = new Subject();

            from(this.permissions.query(descriptor))
                .pipe(takeUntil(destroy))
                .subscribe(
                    res => {
                        permissionStatus = res;
                        subscriber.next(res.state);
                        permissionStatus.addEventListener('change', onChange);
                    },
                    error => subscriber.error(error),
                );

            // clean up
            return () => {
                destroy.next();
                destroy.complete();

                if (permissionStatus) {
                    permissionStatus.removeEventListener('change', onChange);
                }
            };
        }).pipe(shareReplay({bufferSize: 1, refCount: true}));
    }
}
