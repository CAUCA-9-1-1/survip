import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../shared/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  providers: [
    AuthenticationService,
  ]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    // private alertService: AlertService
  ) { }

  public ngOnInit() {
    this.auth.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login() {
    if (!this.username || !this.password) {
      return false;
    }

    this.auth.login(this.username, this.password).subscribe(token => {
      if (token.accessToken) {
        this.router.navigate([this.returnUrl]);
      } else {
        alert('bad login');
      }
    });
  }
}
