import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ArticlesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ArticlesComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
