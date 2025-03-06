import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Auth } from '../../models/auth.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive   ,  MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,],
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  open = "";

  loginData = { email: '', password: '' };
  registerData: Auth = { name: '', email: '', password: '', role: '' };

  constructor(private router: Router, private authSerice: AuthService) { }

  onLogin() {
    console.log("login..");
    this.authSerice.loginAuth(this.loginData)
    this.router.navigate(['/menu'])
  }
  onRegister() {
    console.log("register......");
    this.authSerice.registerAuth(this.registerData)
    this.router.navigate(['/menu'])
  }
}