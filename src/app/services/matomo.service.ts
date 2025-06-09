import {Inject, Injectable, PLATFORM_ID, DOCUMENT} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class MatomoService {
    private readonly matomoUrl = '//analytics.funixproductions.com/';
    private readonly siteId = '1';

    constructor(@Inject(PLATFORM_ID) private platformId: object,
                @Inject(DOCUMENT) private document: Document) {
        if (isPlatformBrowser(this.platformId)) {
            this.loadMatomo();
        }
    }

    private loadMatomo(): void {
        let window: any = this.document.defaultView;

        const _paq = (window as any)._paq = (window as any)._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        _paq.push(['setTrackerUrl', `${this.matomoUrl}matomo.php`]);
        _paq.push(['setSiteId', this.siteId]);

        const script = document.createElement('script');
        script.async = true;
        script.src = `${this.matomoUrl}matomo.js`;
        document.head.appendChild(script);
    }
}
