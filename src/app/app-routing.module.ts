import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { GestionUserRoutedComponent } from './components/usuarios/admin/gestion-user-routed/gestion-user-routed.component';
import { TiendaRoutedComponent } from './components/shared/tienda-routed/tienda-routed.component';
import { BlogRoutedComponent } from './components/shared/blog-routed/blog-routed.component';

export const routes: Routes = [
    { path: '', component:  HomeRoutedComponent},
    { path: 'tienda', component:  TiendaRoutedComponent},
    { path: 'blog', component:  BlogRoutedComponent},

    { path: "gUsuarios", component: GestionUserRoutedComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }