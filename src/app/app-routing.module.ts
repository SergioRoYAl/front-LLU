import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeJsViewerRoutedComponent } from './shared/three-js-viewer-routed/three-js-viewer-routed.component';

export const routes: Routes = [
    { path: '', component: ThreeJsViewerRoutedComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }