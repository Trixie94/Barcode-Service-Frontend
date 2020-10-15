import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Jwt interceptor
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   * Jwt interceptor constructor
   * @param authService Auth service
   */
  constructor(private authService: AuthService) {}

  /**
   * Check if user is logged and set headers
   * @param request Request
   * @param next Next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.authService.getRefreshToken() !== '';
    const isAuthenticated = this.authService.getAccessToken() !== '';
    if (isLoggedIn && isAuthenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAccessToken()}`,
        },
      });
    }
    return next.handle(request);
  }
}
