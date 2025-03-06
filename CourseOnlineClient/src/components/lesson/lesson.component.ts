import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonsService } from '../../services/lessonService/lesson.service';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {


  courseId!: number; // משתנה לאחסון מזהה הקורס
  lessons: any[] = []; // מערך לאחסון השיעורים

  constructor(
    private route: ActivatedRoute,
    private lessonsService: LessonsService
  ) { }

  ngOnInit(): void {
    // קבלת מזהה הקורס מהנתיב
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; // המרה למספר
      this.loadLessons(); // קריאה לפונקציה לטעינת השיעורים
    });
  }

  loadLessons(): void {
    this.lessonsService.getLessons(this.courseId).subscribe(
      (lessons) => {
        this.lessons = lessons; // שמירת השיעורים במשתנה
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }
}
