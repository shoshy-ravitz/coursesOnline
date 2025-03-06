import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/courseService/course.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseComponent } from '../course/course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CourseComponent,
    // BrowserModule,
    CommonModule ,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule],
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
      console.log(data);

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

  // פונקציה לפתיחת פרטי הקורס
  openCourseDetail(courseId: number): void {
    this.router.navigate(['/course-detail', courseId]);
  }
}