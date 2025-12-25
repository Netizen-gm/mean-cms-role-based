import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req:any, next:any){
    const token = localStorage.getItem('access')
    if(token){
      const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      return next.handle(cloned)
    }
    return next.handle(req)
  }
}
