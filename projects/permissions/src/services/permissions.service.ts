import {Inject, Injectable} from '@angular/core';
import {from, fromEvent, Observable} from 'rxjs';
import {shareReplay, switchMap, tap} from 'rxjs/operators';
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

            const sub = from(this.permissions.query(descriptor))
                .pipe(
                    tap(permissionStatus => subscriber.next(permissionStatus.state)),
                    switchMap(permissionStatus => fromEvent(permissionStatus, 'change')),
                )
                .subscribe(
                    ev => subscriber.next((ev.target as PermissionStatus).state),
                    error => subscriber.error(error),
                );

            // clean up
            return () => {
                sub.unsubscribe();
            };
        }).pipe(shareReplay({bufferSize: 1, refCount: true}));
    }
}
