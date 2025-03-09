import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthService } from "../../services/authService/auth.service";
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive ,ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, MatSelectModule, MatToolbarModule],
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  open = "";
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {}


  onLogin() {
    if (this.loginForm.valid) {
      console.log("login..", this.loginForm.value);
      this.authService.loginAuth(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/menu']); // נווט לעמוד הבא רק אם ההתחברות הצליחה
        },
        error: (err: any) => {
          console.error(err); // שגיאה כבר נלכדת ב-loginAuth
        }
      });
    }
  }
  
  onRegister() {
    if (this.registerForm.valid) {
      console.log("register......", this.registerForm.value);
      this.authService.registerAuth(this.registerForm.value);
      this.router.navigate(['/menu']);
    }
  }
}

// import { Component } from '@angular/core';
// import { AuthService } from '../../services/authService/auth.service';
// import { Auth } from '../../models/auth.model';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatCardModule } from '@angular/material/card';
// import { MatSelectModule } from '@angular/material/select';
// import { MatToolbarModule } from '@angular/material/toolbar';


// @Component({
//   selector: 'app-auth',
//   templateUrl: './auth.component.html',
//   standalone: true,
//   imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive   ,  MatButtonModule,
//     MatInputModule,
//     MatCardModule,
//     MatSelectModule,
//     MatToolbarModule,],
//   styleUrls: ['./auth.component.css']
// })
// export class AuthComponent {
//   open = "";

//   loginData = { email: '', password: '' };
//   registerData: Auth = { name: '', email: '', password: '', role: '' };

//   constructor(private router: Router, private authSerice: AuthService) { }

//   onLogin() {
//     console.log("login..");
//     this.authSerice.loginAuth(this.loginData)
//     this.router.navigate(['/menu'])
//   }
//   onRegister() {
//     console.log("register......");
//     this.authSerice.registerAuth(this.registerData)
//     this.router.navigate(['/menu'])
//   }
// }