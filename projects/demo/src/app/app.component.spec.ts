import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PermissionsService} from '@ng-web-apis/permissions';
import {Observable, of} from 'rxjs';
import {AppComponent} from './app.component';

class PermissionsServiceMock {
    constructor(private permissionState: PermissionState) {}
    state(): Observable<PermissionState> {
        return of(this.permissionState);
    }
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let hostEl: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {
                    provide: PermissionsService,
                    useValue: new PermissionsServiceMock('granted'),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        hostEl = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should render Geolocation state', () => {
        const h2 = hostEl.querySelector('h2');

        expect(h2?.textContent).toBe('Geolocation state: granted');
    });
});
