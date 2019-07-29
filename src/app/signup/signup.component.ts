import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = { username: '', password: '' };
  dietPreferences = [
    { name: 'BBQ', checked: false },
    { name: 'Burger', checked: false },
    { name: 'Chinese', checked: false },
    { name: 'Deli', checked: false },
    { name: 'Fast Food', checked: false },
    { name: 'Italian', checked: false },
    { name: 'Japanese', checked: false },
    { name: 'Mexican', checked: false },
    { name: 'Pizza', checked: false }
  ];
  errorMessage: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signup(credentials) {
    credentials.dietPreferences = this.getSelectedPreferences();
    this.authService.signup(credentials).subscribe(
      res => {
        console.log('res', res);
        // Redirect to user dashboard
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  onPrefCheck(index) {
    if (this.dietPreferences[index].checked === true) {
      this.dietPreferences[index].checked = false;
    } else {
      this.dietPreferences[index].checked = true;
    }
  }

  getSelectedPreferences() {
    return this.dietPreferences
      .filter(p => {
        if (p.checked === true) {
          return p;
        }
      })
      .map(p => p.name);
  }
}
