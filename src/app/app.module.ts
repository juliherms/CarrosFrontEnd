import { ListaCarroComponent } from './pages/usuarios/lista-usuario/lista-carro.component';
import { CarroService } from './shared/services/carro.service';
import { DialogService } from './dialog.service';
import { UsuarioService } from './shared/services/usuario.service';
import { AuthInterceptor } from './shared/components/security/login/auth.interceptor';
import { AuthGuard } from './shared/components/security/auth.guard';
import { SharedService } from './shared/services/shared.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { FormsModule} from '@angular/forms';
import { NovoComponent } from './pages/usuarios/novo/novo.component';
import { NovoCarroComponent } from './pages/usuarios/novo-usuario/novo-carro.component';
import { NovoPerfilComponent } from './pages/perfis/novo-perfil/novo-perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaPerfilComponent } from './pages/perfis/lista-perfil/lista-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    NovoComponent,
    NovoCarroComponent,
    ListaCarroComponent,
    NovoPerfilComponent,
    ListaPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,//habilita o uso de formularios
    ReactiveFormsModule,//habilita o uso de formularios reativos
    routes //minhas rotas customizadas
  ],
  providers: [
    UsuarioService,
    CarroService,
    SharedService,
    DialogService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS, //interceptor customizado
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
