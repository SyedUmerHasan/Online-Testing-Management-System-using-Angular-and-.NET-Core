import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        if (localStorage.getItem('currentUser')) {
          const decodedToken = JSON.parse(localStorage.getItem('currentUser')).jwtToken;
          request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${decodedToken}`
                }
              });
        }


        return next.handle(request);
    }
}
