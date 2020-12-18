import {TestBed} from '@angular/core/testing';
import {PermissionsService} from './permissions.service';

describe('PermissionsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('dummy test', () => {
        expect(TestBed.inject(PermissionsService)).toBeTruthy();
    });
});
