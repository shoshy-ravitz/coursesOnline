import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  
  // import { ActivatedRoute, Router } from '@angular/router';
  // import { UserService } from '../services/user.service'; // שירות לניהול משתמשים
  // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  

    userForm: FormGroup;
    userId: string |any;
    token: string |any;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private fb: FormBuilder
    ) {
      this.userForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
    //  this.userId = localStorage.getItem('userId') || ''; // או כל מקור אחר
     // this.token = localStorage.getItem('token') || ''; // או כל מקור אחר
     this.userId=5
     this.token="admin"
      this.loadUserData();
    }
  
    loadUserData() {
      // this.userService.getUserById(this.userId, this.token).subscribe(user => {
      //   this.userForm.patchValue({
      //     name: user.name,
      //     email: user.email,
      //     password: user.password,
      //     role:user.role // לא נכניס סיסמה קיימת
      //   });
      // }, error => {
      //   console.error('Error loading user data:', error);
      // });
    }
  
    onSubmit() {
      // if (this.userForm.valid) {
      //   this.userService.updateUser(this.userId, this.userForm.value, this.token).subscribe(() => {
      //     // נווט לדף המשתמש או דף אחר לאחר השמירה
      //   //  this.router.navigate(['/user']);
      //   }, error => {
      //     console.error('Error updating user:', error);
      //   });
      // }
    }
  }
  

