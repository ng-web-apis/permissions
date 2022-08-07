import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions} from 'ngx-highlightjs';
import {AppComponent} from './app.component';

export const highlightOptions: HighlightOptions = {
    coreLibraryLoader: () => import('highlight.js/lib/core'),
    languages: {
        less: () => import('highlight.js/lib/languages/less'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        xml: () => import('highlight.js/lib/languages/xml'),
    },
} as const;

@NgModule({
    bootstrap: [AppComponent],
    imports: [BrowserModule.withServerTransition({appId: 'demo'}), HighlightModule],
    declarations: [AppComponent],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        {
            provide: APP_BASE_HREF,
            useValue: '',
        },
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: highlightOptions,
        },
    ],
})
export class AppBrowserModule {}
