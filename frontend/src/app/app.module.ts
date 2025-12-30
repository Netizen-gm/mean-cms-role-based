import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { ArticlesComponent } from './articles.component';
import { AuthInterceptor } from './auth.interceptor';
import { PermissionGuard } from './permission.guard';

const routes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, ArticlesComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, PermissionGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
