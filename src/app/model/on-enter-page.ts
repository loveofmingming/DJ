import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router, Event, NavigationEnd} from '@angular/router';
import { BaseUI } from './baseui';

export abstract class OnEnterPage extends BaseUI implements OnInit, OnDestroy {
    private subscription: Subscription;
    protected matchUrl = [];

    protected constructor(
        public router: Router,
    ) {
        super();
    }

    private checkMatchUrl(url) {
        for (let i = 0; i < this.matchUrl.length; i++) {
            if (url === this.matchUrl[i]) {
                return true;
            }
        }
        return false;
    }

    public async ngOnInit() {
        await this.onEnter();
        this.subscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd && this.checkMatchUrl(event.url)) {
                this.onEnter();
            }
        });
    }

    abstract async onEnter();

    public ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }
}
