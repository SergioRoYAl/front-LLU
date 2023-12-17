import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuUnroutedComponent } from "./shared/menu-unrouted/menu-unrouted.component";

export const routes: Routes = [
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }