import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeJsViewerRoutedComponent } from './shared/three-js-viewer-routed/three-js-viewer-routed.component';
import { HomeRoutedComponent } from './shared/home-routed/home-routed.component';

export const routes: Routes = [
    { path: '', component: ThreeJsViewerRoutedComponent },

    { path: 'home', component: HomeRoutedComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }