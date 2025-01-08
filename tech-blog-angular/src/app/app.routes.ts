import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogOverviewComponent } from './blog-overview/blog-overview.component';

export const routes: Routes = [
    {
        path: '',
        component: BlogOverviewComponent
    },
    {
        path: 'details/:type',
        component: BlogDetailsComponent
    }
];
