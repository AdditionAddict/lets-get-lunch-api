import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { of } from 'rxjs';

function tokenGetter() {
  return localStorage.getItem('Authorization');
}

describe('AuthService', () => {
  let authService: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({ config: { tokenGetter } })
      ],
      providers: [AuthService, JwtHelperService]
    });

    authService = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a token with a valid username and password', () => {
      const user = { username: 'myUser', password: 'password' };
      const signupResponse = {
        __v: 0,
        username: 'myUser',
        password:
          '$2a$10$oDmleF/nOy/Z1BW9Lo83oO4Hfa4sRlQEqtjURFVvYgwNcwJUkwidi',
        _id: '5d3ebdccadb50336e0cc3857',
        dietPreferences: []
      };
      const loginResponse = { token: 's3cr3tt0ken' };
      let response;

      authService.signup(user).subscribe(res => {
        response = res;
      });
      spyOn(authService, 'login').and.callFake(() =>
        of(loginResponse)
      );

      http
        .expectOne('http://localhost:8080/api/users')
        .flush(signupResponse);
      expect(response).toEqual(loginResponse);
      expect(authService.login).toHaveBeenCalled();
      http.verify();
    });

    it('should return an error for an invalid user object', () => {
      const user = { username: 'myUser', password: 'pswd' };
      const signupResponse =
        'Your password must be at least 5 characters long.';
      let errorResponse;

      authService.signup(user).subscribe(
        res => {},
        err => {
          errorResponse = err;
        }
      );

      http
        .expectOne('http://localhost:8080/api/users')
        .flush(
          { message: signupResponse },
          { status: 400, statusText: 'Bad Request' }
        );
      expect(errorResponse.error.message).toEqual(signupResponse);
      http.verify();
    });
  });

  describe('login', () => {
    it('should return a token with a valid username and password', () => {
      const user = { username: 'myUser', password: 'password' };
      const loginResponse = { token: 's3cr3tt0ken' };
      let response;

      authService.login(user).subscribe(res => {
        response = res;
      });

      http
        .expectOne('http://localhost:8080/api/sessions')
        .flush(loginResponse);
      expect(response).toEqual(loginResponse);
      expect(localStorage.getItem('Authorization')).toEqual(
        's3cr3tt0ken'
      );
      http.verify();
    });

    it('should return an error for an invalid user object', () => {
      const user = { username: 'myUser', password: 'pswd' };
      const signupResponse =
        'Your password must be at least 5 characters long.';
      let errorResponse;

      authService.signup(user).subscribe(
        res => {},
        err => {
          errorResponse = err;
        }
      );

      http
        .expectOne('http://localhost:8080/api/users')
        .flush(
          { message: signupResponse },
          { status: 400, statusText: 'Bad Request' }
        );
      expect(errorResponse.error.message).toEqual(signupResponse);
      http.verify();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if user is logged in', () => {
      localStorage.setItem(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
          'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
          'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      );
      expect(authService.isLoggedIn()).toEqual(true);
    });

    it('should return false if user is not logged in', () => {
      localStorage.removeItem('Authorization');
      expect(authService.isLoggedIn()).toEqual(false);
    });
  });
});
