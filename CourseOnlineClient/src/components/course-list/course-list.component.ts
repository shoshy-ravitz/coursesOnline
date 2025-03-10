import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/courseService/course.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseComponent } from '../course/course.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseComponent,
     MatListModule,
     MatCardModule,
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
 
  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  // הצטרף לקורס
  enroll(id: number) {
   this.courseService.enrollStudent(id)
  }

  // עזוב קורס
  leave(id: number) {

  }
}