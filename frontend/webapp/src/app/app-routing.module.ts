import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BranchComponent } from './branch/branch.component';
import { CommitComponent } from './commit/commit.component';

const publicRoutes: Routes = [
    { path: '', children:[
        { path: '', component: HomeComponent, children: [
            { path: 'branch/:branch', component: BranchComponent }
        ]},
        { path: 'commit/:commit', component: CommitComponent },
        // { path: 'pr', component: PRComponent }
    ]}
];

const routes: Routes = [
    {
        path: '',
        children: [
            ...publicRoutes,
            {
                path: '', component: HomeComponent, pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
