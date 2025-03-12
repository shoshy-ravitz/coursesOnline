import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../../services/courseService/course.service';
import { Router, RouterOutlet } from '@angular/router';
import { Course } from '../../models/course.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-course',
  standalone: true,
  imports: [RouterOutlet, MatCardModule,CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})

export class CourseComponent implements OnInit {
  @Input() isMangement: boolean = false
  @Input() courseId: number | any;
  courseDetails: Course = { title: "", description: "", teacherId: 0, id: 0 }

  constructor(private router: Router, private coursesService: CourseService) { }

  ngOnInit(): void {
    console.log(this.courseId);
    this.loadCourseDetails();
  }

  loadCourseDetails(): void {
    this.coursesService.getCourseById(this.courseId).subscribe(
      (course) => {
        this.courseDetails = course;
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  showLessons() {
    if (this.isMangement)
      this.router.navigate(['/menu/course-management/lesson-management', this.courseId]);
    else {
      if (this.courseId)
        this.router.navigate(['/menu/course', this.courseId, 'lessons']);
    }
  }

  // הצטרף לקורס
  enroll() {
    this.coursesService.enrollStudent(this.courseId)
   }
}