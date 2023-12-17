import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule, routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SessionAjaxService } from "./services/session.ajax.service";
import { UserAjaxService } from "./services/user.ajax.service";
import { MenuUnroutedComponent } from "./shared/menu-unrouted/menu-unrouted.component";
import { FooterUnroutedComponent } from "./shared/footer-unrouted/footer-unrouted.component";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptor/auth.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        MenuUnroutedComponent,
        FooterUnroutedComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserModule

    ],
    providers: [
        SessionAjaxService,
        UserAjaxService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }