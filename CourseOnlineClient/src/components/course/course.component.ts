import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../../services/courseService/course.service';
import { Router, RouterOutlet } from '@angular/router';
import { Course } from '../../models/course.model';
import { LessonListComponent } from '../lesson-list/lesson-list.component';
import { ManagementLessonComponent } from '../lesson-management/lesson-management.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-course',
  standalone: true,
  imports: [RouterOutlet, LessonListComponent, ManagementLessonComponent,MatCardModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})

export class CourseComponent implements OnInit {
  @Input() isMangement: boolean = false
  @Input() courseId: number|any; // קלט לקבלת מזהה הקורס
  courseDetails: Course = { title: "", description: "", teacherId: 0, id: 0 }

  constructor(private router: Router, private coursesService: CourseService) { }

  ngOnInit(): void {
    console.log(this.courseId);
    this.loadCourseDetails();
  }

  loadCourseDetails(): void {
    console.log("loud course componant course "+this.courseId);
    this.coursesService.getCourseById(this.courseId).subscribe(
      (course) => {
        console.log("loud course componant course after subscribe "+this.courseId);

        this.courseDetails = course;
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  showLessons() {
    debugger
    console.log(this.courseId);
    
    if (this.isMangement)
      this.router.navigate(['/menu/course-management/lesson-management', this.courseId]);
    else {
      if (this.courseId)
        this.router.navigate(['/menu/course', this.courseId, 'lessons']);
      else console.log(this.courseId);
    }
  }
}