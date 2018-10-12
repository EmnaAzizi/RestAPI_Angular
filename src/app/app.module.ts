import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AffichageComponent } from "./affichage/affichage.component";
import { MarsipularmiCService } from "./marsipularmi-c.service";
import { HttpModule } from "../../node_modules/@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { FormsModule } from "@angular/forms";
import { AddnewComponent } from "./addnew/addnew.component";
import { AmisComponent } from "./amis/amis.component";
import { EditComponent } from "./edit/edit.component";
import { AmisPipe } from "./amis.pipe";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "login", component: LoginComponent },
  {
    path: "users/:username",
    component: AffichageComponent,
    canActivate: [AuthGuard]
  },
  { path: "ajout/:id", component: AddnewComponent },
  { path: "Amis/:id", component: AmisComponent, canActivate: [AuthGuard] },
  {
    path: "edit/:id/:username",
    component: EditComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AffichageComponent,
    LoginComponent,
    AddnewComponent,
    AmisComponent,
    EditComponent,
    AmisPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [MarsipularmiCService, AuthGuard, AuthService],
  bootstrap: [
    AppComponent,
    AffichageComponent,
    LoginComponent,
    AddnewComponent,
    EditComponent
  ]
})
export class AppModule {}
