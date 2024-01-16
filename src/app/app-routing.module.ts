import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './shared/home-routed/home-routed.component';

export const routes: Routes = [
    { path: '', component:  HomeRoutedComponent},
    { path: 'tienda', component:  HomeRoutedComponent},
    { path: 'blog', component:  HomeRoutedComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }