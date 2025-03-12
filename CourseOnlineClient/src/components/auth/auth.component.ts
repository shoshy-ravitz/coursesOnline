import { MatSelectModule } from '@angular/material/select';
import { Component, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthService } from "../../services/authService/auth.service";
import { MatInputModule } from '@angular/material/input';
import { Router,RouterOutlet } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [ RouterOutlet,ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, MatSelectModule, MatToolbarModule, MatDialogModule],
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {
  @ViewChild('loginDialog') loginDialog!: TemplateRef<any>;
  @ViewChild('registerDialog') registerDialog!: TemplateRef<any>;

  open = "";
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private dialog: MatDialog,private fb: FormBuilder, private router: Router, private authService: AuthService) {
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

  openLoginDialog() {
    this.dialog.open(this.loginDialog);
  }

  openRegisterDialog() {
    this.dialog.open(this.registerDialog);
  }

  closeLoginDialog() {
    this.dialog.closeAll();
  }

  closeRegisterDialog() {
    this.dialog.closeAll();
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.closeLoginDialog()
      this.authService.loginAuth(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/menu']); 
        },
        error: (err: any) => {
          console.error(err); 
        }
      });
    }
  }
  
  onRegister() {
    if (this.registerForm.valid) {
      this.closeRegisterDialog()
      this.authService.registerAuth(this.registerForm.value);
      this.router.navigate(['/menu']);
    }
  }
}
