import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Component({ selector: 'app-articles', template: `
<h2>Articles</h2>
<div *ngIf="articles?.length; else none">
  <div *ngFor="let a of articles">
    <h3>{{a.title}}</h3>
    <p>{{a.body}}</p>
  </div>
</div>
<ng-template #none><p>No articles</p></ng-template>
` })
export class ArticlesComponent implements OnInit {
  articles:any[] = []
  constructor(private http: HttpClient){}
  ngOnInit(){
    this.http.get(`${environment.apiUrl}/articles`).subscribe((res:any)=> this.articles = res, err=> console.error(err))
  }
}
