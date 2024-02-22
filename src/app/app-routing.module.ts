import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { GestionUserRoutedComponent } from './components/usuarios/admin/gestion-user-routed/gestion-user-routed.component';
import { TiendaRoutedComponent } from './components/shared/tienda-routed/tienda-routed.component';
import { BlogRoutedComponent } from './components/shared/blog-routed/blog-routed.component';
import { GestionBlogRoutedComponent } from './components/blog/admin/gestion-blog-routed/gestion-blog-routed.component';
import { GestionBlogNewRoutedComponent } from './components/blog/admin/gestion-blog-new-routed/gestion-blog-new-routed.component';
import { GestionBlogDetailUnroutedComponent } from './components/blog/admin/gestion-blog-detail-unrouted/gestion-blog-detail-unrouted.component';
import { GestionBlogEditRoutedComponent } from './components/blog/admin/gestion-blog-edit-routed/gestion-blog-edit-routed.component';
import { GestionBlogViewRoutedComponent } from './components/blog/admin/gestion-blog-view-routed/gestion-blog-view-routed.component';
import { GestionProductosRoutedComponent } from './components/tienda/admin/gestion-productos-routed/gestion-productos-routed.component';
import { GestionProductosNewRoutedComponent } from './components/tienda/admin/gestion-productos-new-routed/gestion-productos-new-routed.component';
import { GestionProductosViewRoutedComponent } from './components/tienda/admin/gestion-productos-view-routed/gestion-productos-view-routed.component';
import { GestionProductosEditRoutedComponent } from './components/tienda/admin/gestion-productos-edit-routed/gestion-productos-edit-routed.component';
import { GestionUserNewRoutedComponent } from './components/usuarios/admin/gestion-user-new-routed/gestion-user-new-routed.component';
import { GestionUserDetailUnroutedComponent } from './components/usuarios/admin/gestion-user-detail-unrouted/gestion-user-detail-unrouted.component';
import { GestionUserEditRoutedComponent } from './components/usuarios/admin/gestion-user-edit-routed/gestion-user-edit-routed.component';
import { CarritoRoutedComponent } from './components/shared/carrito-routed/carrito-routed.component';
import { PedidoRoutedComponent } from './components/shared/pedido-routed/pedido-routed.component';

export const routes: Routes = [
    { path: '', component:  TiendaRoutedComponent},
    { path: 'tienda', component:  TiendaRoutedComponent},
    { path: 'blog', component:  BlogRoutedComponent},
    { path: 'pedidos', component: PedidoRoutedComponent},
    { path: 'carrito', component: CarritoRoutedComponent},

    { path: "gUsuarios", component: GestionUserRoutedComponent},
    { path: "gUsuarios/new", component: GestionUserNewRoutedComponent},  
    { path: "gUsuarios/detail/:id", component: GestionUserDetailUnroutedComponent},
    { path: "gUsuarios/edit/:id", component: GestionUserEditRoutedComponent},
   
    { path: "gProductos", component: GestionProductosRoutedComponent },
    { path: "gProductos/new", component: GestionProductosNewRoutedComponent },
    { path: "gProductos/detail/:id", component: GestionProductosViewRoutedComponent },
    { path: "gProductos/edit/:id", component: GestionProductosEditRoutedComponent },

    { path: "gBlog", component: GestionBlogRoutedComponent },
    { path: "gBlog/new", component: GestionBlogNewRoutedComponent },
    { path: "gBlog/detail/:id", component: GestionBlogViewRoutedComponent},
    { path: "gBlog/edit/:id", component: GestionBlogEditRoutedComponent    },
    { path: "gBlog/byUsuario/:id", component: GestionBlogRoutedComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }