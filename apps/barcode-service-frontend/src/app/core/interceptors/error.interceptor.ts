import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, filter, take } from 'rxjs/operators';
import { AppConfigService } from '../services/app-config.service';
import { AuthService } from '../services/auth.service';

/**
 * Error interceptor
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Is refreshing token
   */
  private isRefreshing = false;
  /**
   * Subject for refresh token
   */
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * Error inteceptor constructor
   * @param authService Auth service
   * @param http Http client
   */
  constructor(private authService: AuthService, private http: HttpClient) {}

  /**
   * Handles 401 error
   * @param request Request
   * @param next Next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          return this.handle401Error(request, next);
        } else {
          return throwError(err);
        }
      })
    );
  }

  /**
   * Handles 401 errors and refresh token
   * @param request Request
   * @param	next Next
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          return next.handle(
            this.addToken(request, {
              accessToken: this.authService.getAccessToken(),
            })
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(
            this.addToken(request, {
              accessToken: this.authService.getAccessToken(),
            })
          );
        })
      );
    }
  }

  /**
   * Refresh token
   */
  private refreshToken(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.getRefreshToken() });
    return this.http
      .post<any>(
        `${AppConfigService.config.api}auth/refresh_token`,
        {},
        {
          headers,
        }
      )
      .pipe(
        map((tokens: any) => {
          this.authService.setAccessToken(tokens.access_token, tokens.expires_in);
        })
      );
  }

  /**
   * Set headers for authorization
   * @param request Request
   * @param token Token
   */
  private addToken(request: HttpRequest<any>, token: { accessToken: string }): HttpRequest<any> {
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token.accessToken}`),
      });
    }
    return request;
  }
}
