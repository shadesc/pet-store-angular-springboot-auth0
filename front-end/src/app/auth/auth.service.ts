/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token id_token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });

  // Store authentication data
  userProfile: any;
  accessToken: string;
  idToken: string;
  authenticated: boolean;
  privileged: boolean;
  tokenRenewalTimeout: any;

  constructor(private router: Router) {
    this.checkSessionAndGetNewAccessToken();
  }

  login() {
    this.auth0.authorize();
  }

  handleLoginCallback() {
    const self = this;
    return new Promise(function (resolve, reject) {
      // When Auth0 hash parsed, get profile
      self.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken) {
          window.location.hash = '';
          self.getUserInfo(authResult);
          resolve(1);
        } else if (err || authResult == null || authResult.accessToken == null) {
          console.error(`Error: ${err ? err.error : ''}`);
          reject(0);
        }
      });
    });
  }

  checkSessionAndGetNewAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      } else if (err) {
        this.authenticated = false;
      }
    });
  }

  getUserInfo(authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.accessToken = authResult.accessToken;
    localStorage.setItem('access_token', this.accessToken);
    this.idToken = authResult.idToken;
    localStorage.setItem('id_token', this.accessToken);
    this.userProfile = profile;
    this.authenticated = true;
    const role = authResult.idTokenPayload['https://ace.petstore.com/roles'][0];
    this.privileged = role === 'admin';
    // schedule a token renewal
    this.scheduleRenewal();
  }

  logout() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.userProfile = undefined;
    this.accessToken = undefined;
    this.authenticated = false;
    this.tokenRenewalTimeout = 0;
    this.auth0.logout({
      returnTo: environment.auth.logoutReturnTo,
    });
  }

  get isLoggedIn(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt && this.authenticated;
  }

  renewToken() {
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          console.log(`Could not get a new token (${err.error}: ${err.error_description}).`);
        } else {
          this.getUserInfo(result);
          console.log(`Successfully renewed auth!`);
        }
      }
    );
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now() + 5;
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        console.log('renewing token');
        this.renewToken();
      }, delay);
    }
  }
}
