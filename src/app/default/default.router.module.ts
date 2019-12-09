import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { DefaultPage } from './default.page';
import {config} from 'rxjs/Rx';

const routes: Routes = [
    // {path: '', redirectTo: 'default',  pathMatch: 'full' },
    {
        path: '',
        component: DefaultPage,
        children: [
            {
                path: 'renwu',
                children: [
                    {
                        path: '',
                        loadChildren: '../renwu/renwu.module#RenwuPageModule'
                    }
                ]
            },
            {
                path: 'wode',
                children: [
                    {
                        path: '',
                        loadChildren: '../wode/wode.module#WodePageModule',
                    },
                ]
            },
            {
                path: '',
                redirectTo: 'renwu',
                pathMatch: 'full'
            },
            {
                path: 'pickables',
                redirectTo: 'renwu/pickables',
                pathMatch: 'full'
            },
            {
                path: 'mine',
                redirectTo: 'renwu/mine',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DefaultPageRoutingModule {
}
