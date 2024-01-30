import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule, routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SessionAjaxService } from "./services/session.ajax.service";
import { UserAjaxService } from "./services/user.ajax.service";
import { MenuUnroutedComponent } from "./components/shared/menu-unrouted/menu-unrouted.component";
import { FooterUnroutedComponent } from "./components/shared/footer-unrouted/footer-unrouted.component";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CryptoService } from './services/crypto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginUnroutedComponent } from "./components/shared/login-unrouted/login-unrouted.component";
import { HomeRoutedComponent } from "./components/shared/home-routed/home-routed.component";

import { GestionUserRoutedComponent } from "./components/usuarios/admin/gestion-user-routed/gestion-user-routed.component";
import { GestionUserPlistUnroutedComponent } from "./components/usuarios/admin/gestion-user-plist-unrouted/gestion-user-plist-unrouted.component";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from "primeng/api";
import { GestionUserDetailUnroutedComponent } from "./components/usuarios/admin/gestion-user-detail-unrouted/gestion-user-detail-unrouted.component";
import { DialogService } from "primeng/dynamicdialog";
import { TiendaRoutedComponent } from "./components/shared/tienda-routed/tienda-routed.component";
import { BlogRoutedComponent } from "./components/shared/blog-routed/blog-routed.component";
import { ProductCardUnroutedComponent } from "./components/tienda/user/product-card-unrouted/product-card-unrouted.component";
import { ProductoAjaxService } from "./services/producto.ajax.service";
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [
        AppComponent,
        MenuUnroutedComponent,
        FooterUnroutedComponent,
        LoginUnroutedComponent,
        HomeRoutedComponent,
        TiendaRoutedComponent,
        BlogRoutedComponent,
        ProductCardUnroutedComponent,

        GestionUserRoutedComponent,
        GestionUserPlistUnroutedComponent,
        GestionUserDetailUnroutedComponent
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
        CardModule
    ],
    providers: [
        SessionAjaxService,
        UserAjaxService,
        CryptoService,
        MatSnackBar,
        DialogService,
        ConfirmationService,
        ProductoAjaxService,

        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }