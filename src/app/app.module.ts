import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule, routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SessionAjaxService } from "./services/session.ajax.service";
import { UserAjaxService } from "./services/user.ajax.service";
import { MenuUnroutedComponent } from "./components/shared/menu-unrouted/menu-unrouted.component";
import { FooterUnroutedComponent } from "./components/shared/footer-unrouted/footer-unrouted.component";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CryptoService } from './services/crypto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginUnroutedComponent } from "./components/shared/login-unrouted/login-unrouted.component";
import { HomeRoutedComponent } from "./components/shared/home-routed/home-routed.component";
import {MatRadioModule} from '@angular/material/radio';

import { GestionUserRoutedComponent } from "./components/usuarios/admin/gestion-user-routed/gestion-user-routed.component";
import { GestionUserPlistUnroutedComponent } from "./components/usuarios/admin/gestion-user-plist-unrouted/gestion-user-plist-unrouted.component";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from "primeng/api";
import { GestionUserDetailUnroutedComponent } from "./components/usuarios/admin/gestion-user-detail-unrouted/gestion-user-detail-unrouted.component";
import { DialogService, DynamicDialogComponent } from "primeng/dynamicdialog";
import { TiendaRoutedComponent } from "./components/shared/tienda-routed/tienda-routed.component";
import { BlogRoutedComponent } from "./components/shared/blog-routed/blog-routed.component";
import { ProductCardUnroutedComponent } from "./components/tienda/user/product-card-unrouted/product-card-unrouted.component";
import { ProductoAjaxService } from "./services/producto.ajax.service";
import { CardModule } from 'primeng/card';
import { GestionBlogRoutedComponent } from "./components/blog/admin/gestion-blog-routed/gestion-blog-routed.component";
import { GestionBlogPlistUnroutedComponent } from "./components/blog/admin/gestion-blog-plist-unrouted/gestion-blog-plist-unrouted.component";
import { GestionBlogDetailUnroutedComponent } from "./components/blog/admin/gestion-blog-detail-unrouted/gestion-blog-detail-unrouted.component";
import { NoticiaAjaxService } from "./services/noticia.ajax.service";
import { RespuestaAjaxService } from "./services/respuesta.ajax.service";
import { DocumentoAjaxService } from "./services/documento.ajax.service";
import { BlogCardUnroutedComponent } from "./components/blog/user/blog-card-unrouted/blog-card-unrouted.component";
import { MediaService } from "./services/media.service";
import { GestionBlogNewRoutedComponent } from "./components/blog/admin/gestion-blog-new-routed/gestion-blog-new-routed.component";
import { GestionBlogFormUnroutedComponent } from "./components/blog/admin/gestion-blog-form-unrouted/gestion-blog-form-unrouted.component";
import { GestionUserSelectionUnroutedComponent } from "./components/usuarios/admin/gestion-user-selection-unrouted/gestion-user-selection-unrouted.component";
import { GestionBlogUploadUnroutedComponent } from "./components/blog/admin/gestion-blog-upload-unrouted/gestion-blog-upload-unrouted.component";
import { GestionBlogViewRoutedComponent } from "./components/blog/admin/gestion-blog-view-routed/gestion-blog-view-routed.component";
import { GestionBlogEditRoutedComponent } from "./components/blog/admin/gestion-blog-edit-routed/gestion-blog-edit-routed.component";
import { GestionProductosRoutedComponent } from "./components/tienda/admin/gestion-productos-routed/gestion-productos-routed.component";
import { GestionProductosPlistUnroutedComponent } from "./components/tienda/admin/gestion-productos-plist-unrouted/gestion-productos-plist-unrouted.component";
import { GestionProductosDetailUnroutedComponent } from "./components/tienda/admin/gestion-productos-detail-unrouted/gestion-productos-detail-unrouted.component";
import { GestionProductosFormUnroutedComponent } from "./components/tienda/admin/gestion-productos-form-unrouted/gestion-productos-form-unrouted.component";
import { GestionProductosUploadUnroutedComponent } from "./components/tienda/admin/gestion-productos-upload-unrouted/gestion-productos-upload-unrouted.component";
import { GestionProductosNewRoutedComponent } from "./components/tienda/admin/gestion-productos-new-routed/gestion-productos-new-routed.component";
import { GestionProductosViewRoutedComponent } from "./components/tienda/admin/gestion-productos-view-routed/gestion-productos-view-routed.component";
import { GestionProductosEditRoutedComponent } from "./components/tienda/admin/gestion-productos-edit-routed/gestion-productos-edit-routed.component";
import { GestionUserNewRoutedComponent } from "./components/usuarios/admin/gestion-user-new-routed/gestion-user-new-routed.component";
import { GestionUserEditRoutedComponent } from "./components/usuarios/admin/gestion-user-edit-routed/gestion-user-edit-routed.component";
import { GestionUserFormUnroutedComponent } from "./components/usuarios/admin/gestion-user-form-unrouted/gestion-user-form-unrouted.component";
import { GestionUserUploadUnroutedComponent } from "./components/usuarios/admin/gestion-user-upload-unrouted/gestion-user-upload-unrouted.component";
import { TagModule } from 'primeng/tag';
import { GestionUserViewRoutedComponent } from "./components/usuarios/admin/gestion-user-view-routed/gestion-user-view-routed.component";
import { GestionProductosPlistRoutedComponent } from "./components/tienda/admin/gestion-productos-plist-routed/gestion-productos-plist-routed.component";
import { CarritoRoutedComponent } from "./components/shared/carrito-routed/carrito-routed.component";
import { CarritoUnroutedComponent } from "./components/carrito/user/carrito-unrouted/carrito-unrouted.component";
import { ProductViewUnroutedComponent } from "./components/tienda/user/product-view-unrouted/product-view-unrouted.component";
import { DetallePedidoAjaxService } from "./services/detallePedido.ajax.service";
import { CarritoCardUnroutedComponent } from "./components/carrito/user/carrito-card-unrouted/carrito-card-unrouted.component";
import { PedidoUnroutedComponent } from "./components/pedido/user/pedido-unrouted/pedido-unrouted.component";
import { PedidoRoutedComponent } from "./components/shared/pedido-routed/pedido-routed.component";
import { PedidoCardUnroutedComponent } from "./components/pedido/user/pedido-card-unrouted/pedido-card-unrouted.component";


@NgModule({
    declarations: [
        AppComponent,
        MenuUnroutedComponent,
        FooterUnroutedComponent,
        LoginUnroutedComponent,
        HomeRoutedComponent,
        
        BlogRoutedComponent,
        TiendaRoutedComponent,
        ProductViewUnroutedComponent,

        CarritoUnroutedComponent,
        CarritoRoutedComponent,
        CarritoCardUnroutedComponent,

        PedidoUnroutedComponent,
        PedidoRoutedComponent,
        PedidoCardUnroutedComponent,
        
        ProductCardUnroutedComponent,
        BlogCardUnroutedComponent,

        GestionProductosRoutedComponent,
        GestionProductosPlistUnroutedComponent,
        GestionProductosDetailUnroutedComponent,
        GestionProductosFormUnroutedComponent,
        GestionProductosUploadUnroutedComponent,
        GestionProductosNewRoutedComponent,
        GestionProductosViewRoutedComponent,
        GestionProductosEditRoutedComponent,
        GestionProductosPlistRoutedComponent,


        GestionUserRoutedComponent,
        GestionUserPlistUnroutedComponent,
        GestionUserDetailUnroutedComponent,
        GestionUserSelectionUnroutedComponent,
        GestionUserNewRoutedComponent,
        GestionUserEditRoutedComponent,
        GestionUserFormUnroutedComponent,
        GestionUserUploadUnroutedComponent,
        GestionUserViewRoutedComponent,

        GestionBlogRoutedComponent,
        GestionBlogPlistUnroutedComponent,
        GestionBlogDetailUnroutedComponent,
        GestionBlogNewRoutedComponent,
        GestionBlogFormUnroutedComponent,
        GestionBlogUploadUnroutedComponent,
        GestionBlogViewRoutedComponent,
        GestionBlogEditRoutedComponent,

        
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        DialogModule,
        ButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        ConfirmPopupModule,
        MatIconModule,
        PaginatorModule,
        CardModule,
        MatRadioModule,
        TagModule
        
    ],
    providers: [

        // Servicios PrimeNG
        MatSnackBar,
        MatSelectModule,
        DialogService,
        ConfirmationService,

        // Servicios creados por nosotros
        CryptoService,
        SessionAjaxService,
        UserAjaxService,
        ProductoAjaxService,
        NoticiaAjaxService,
        RespuestaAjaxService,
        DocumentoAjaxService,
        MediaService,
        DetallePedidoAjaxService,

        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }