import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule,
    MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router, private userService: UserService) {
  }

  deleteUser() {
    let userId = sessionStorage.getItem('userId')||"";
    console.log(userId);
    
    this.userService.deleteUser(userId).subscribe(() => {
      console.log("delet in menu ");

      // נווט לדף הכניסה או דף אחר לאחר המחיקה
      this.router.navigate(['/auth']);
    })
  }
}