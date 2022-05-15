import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
const { baseSocketUrl, toastrBasicConfig } = environment;

// routing
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { PanelComponent } from './components/panel/panel.component';

// services
import { TokenStorageService } from './services/token-storage.service';

const tokenService: TokenStorageService = new TokenStorageService();
const config: SocketIoConfig = { url: baseSocketUrl, options: { query: tokenService.getIdUserAndIdProfile() } };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrBasicConfig),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
