import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { NeedComponent } from './need/need.component';
import { ProvideComponent } from './provide/provide.component';
import { NeedpopupComponent } from './needpopup/needpopup.component';
import { ProvidepopupComponent } from './providepopup/providepopup.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchpopupComponent } from './matchpopup/matchpopup.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, HomeComponent, UserlistingComponent, UpdatepopupComponent, NeedComponent, ProvideComponent, NeedpopupComponent, ProvidepopupComponent, MatchesComponent, MatchpopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
