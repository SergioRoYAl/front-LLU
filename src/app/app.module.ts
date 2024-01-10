import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule, routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SessionAjaxService } from "./services/session.ajax.service";
import { UserAjaxService } from "./services/user.ajax.service";
import { MenuUnroutedComponent } from "./shared/menu-unrouted/menu-unrouted.component";
import { FooterUnroutedComponent } from "./shared/footer-unrouted/footer-unrouted.component";
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
import { LoginUnroutedComponent } from "./shared/login-routed/login-unrouted.component";
import { ThreeJsViewerRoutedComponent } from "./shared/three-js-viewer-routed/three-js-viewer-routed.component";


@NgModule({
    declarations: [
        AppComponent,
        MenuUnroutedComponent,
        FooterUnroutedComponent,
        LoginUnroutedComponent,
        ThreeJsViewerRoutedComponent
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
        MatInputModule
    ],
    providers: [
        SessionAjaxService,
        UserAjaxService,
        CryptoService,
        MatSnackBar,

        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }