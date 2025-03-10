import { Component } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {
  courses: Course[] = []
  constructor(){}
}
