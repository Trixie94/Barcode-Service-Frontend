import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

/**
 * Auth service
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Creates an instance of AuthService
   * @param http Http client
   * @param cookieService Cookie service
   */
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /**
   * Get token and set cookies
   * @param authForm Auth form
   * @return Token informations
   */
  public getToken(authForm: FormData): Observable<any> {
    return this.http.post<any>(`${AppConfigService.config.api}auth/token`, authForm).pipe(
      map((user: any) => {
        this.setAccessToken(user.access_token, user.expires_in);
        this.setRefreshToken(user.refresh_token);
        return user;
      })
    );
  }

  /**
   * Get access token from cookies
   */
  public getAccessToken(): string {
    return this.cookieService.get('accessToken') || '';
  }

  /**
   * Get refresh token from cookies
   */
  public getRefreshToken(): string {
    return this.cookieService.get('refreshToken') || '';
  }

  /**
   * Set access token in cookies
   * @param accessToken Access token
   * @param expiresInMinutes Cookie life time in minutes
   */
  public setAccessToken(accessToken: string, expiresInMinutes: number): void {
    const oneDayInXMinutes = 1 / 24 / (60 / expiresInMinutes);
    if (window.location.protocol === 'https:') {
      this.cookieService.set(
        'accessToken',
        accessToken,
        oneDayInXMinutes,
        '/',
        window.location.hostname,
        window.location.protocol === 'https:',
        'None'
      );
    } else {
      this.cookieService.set('accessToken', accessToken, oneDayInXMinutes, '/');
    }
  }

  /**
   * Set refresh token in cookies
   * @param refreshToken Refresh token
   */
  private setRefreshToken(refreshToken: string): void {
    const oneHourInDay = 1 / 24;
    if (window.location.protocol === 'https:') {
      this.cookieService.set(
        'refreshToken',
        refreshToken,
        oneHourInDay,
        '/',
        window.location.hostname,
        window.location.protocol === 'https:',
        'None'
      );
    } else {
      this.cookieService.set('refreshToken', refreshToken, oneHourInDay, '/');
    }
  }

  /**
   * Clear cookies
   */
  private clearCookies(): void {
    this.cookieService.delete('accessToken', '/', window.location.hostname);
    this.cookieService.delete('refreshToken', '/', window.location.hostname);
  }
}
