# ![ng-web-apis logo](projects/demo/src/assets/logo.svg) Permissions API for Angular

> Part of <img src="projects/demo/src/assets/web-api.svg" align="top"> [Web APIs for Angular](https://ng-web-apis.github.io/)

[![npm version](https://img.shields.io/npm/v/@ng-web-apis/permissions.svg)](https://npmjs.com/package/@ng-web-apis/permissions)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ng-web-apis/permissions)](https://bundlephobia.com/result?p=@ng-web-apis/permissions)
![CI](https://github.com/ng-web-apis/permissions/workflows/CI/badge.svg)
[![Coveralls github](https://img.shields.io/coveralls/github/ng-web-apis/permissions)](https://coveralls.io/github/ng-web-apis/permissions?branch=master)
[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)

This is a library to use
[Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
with Angular.

## Install

If you do not have [@ng-web-apis/common](https://github.com/ng-web-apis/common):

```
npm i @ng-web-apis/common
```

Now install the package:

```
npm i @ng-web-apis/permissions
```

## How to use

### PermissionsService

Import service in your component:

```ts
import { PermissionsService } from '@ng-web-apis/permissions';

...
constructor(private readonly permissions: PermissionsService) {}
```

Now, use the service to retrieve the [state](https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus#Properties) of the permission in question. Below is an example of checking the permission to use geolocation:

```ts
const geolocationStatus$ = this.permissions.state('geolocation');
geolocationStatus$.subscribe(geolocationStatus => doSomething(geolocationStatus));
```

Note, that a call to the `permissions.state()` returns an observable, which will emit new values in case the state for the permission in question changes. If you need to get state just once and stop observing the permission, you can use `take(1)` RxJs operator:

```ts
geolocationStatus$
    .pipe(take(1))
    .subscribe(geolocationStatus => doSomething(geolocationStatus));
```

The observable is cold, meaning if there are no active subscriptions, it doesn't track the status of the permission.

## Tokens

The library also provides a tokens to simplify working with [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API):

-   `PERMISSIONS_SUPPORT` returns `true` if user's browser supports [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)

```ts
export class YourComponent {
  constructor(
    @Inject(PERMISSIONS_SUPPORT) private readonly permissionsSupport: boolean
  ) {}
    ...
```

## See also

Other [Web APIs for Angular](https://ng-web-apis.github.io/) by [@ng-web-apis](https://github.com/ng-web-apis)

## Open-source

Do you also want to open-source something, but hate the collateral work?
Check out this [Angular Open-source Library Starter](https://github.com/TinkoffCreditSystems/angular-open-source-starter)
we’ve created for our projects. It got you covered on continuous integration,
pre-commit checks, linting, versioning + changelog, code coverage and all that jazz.
