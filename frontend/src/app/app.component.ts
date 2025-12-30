import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<nav>
  <a routerLink="/">Articles</a>
  <a routerLink="/login">Login</a>
</nav>
<div class="container">
  <router-outlet></router-outlet>
</div>
`,
  styles: []
})
export class AppComponent {}
