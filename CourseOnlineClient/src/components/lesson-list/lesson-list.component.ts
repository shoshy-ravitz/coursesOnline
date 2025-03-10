import { Component, Input, OnInit } from '@angular/core';
import { LessonsService } from '../../services/lessonService/lesson.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent implements OnInit {
    courseId!: number; 
    lessons: any[] = []; 

    constructor(private route: ActivatedRoute, private lessonsService: LessonsService) {}

    ngOnInit(): void {
        // קבלת ה-ID מה-URL
        this.route.parent?.params.subscribe(params => {
            this.courseId = +params['id']; 
            console.log(this.courseId);
            this.loadLessons();
        });
    }

    loadLessons(): void {
        console.log(this.courseId);
        this.lessonsService.getLessons(this.courseId).subscribe(
            (lessons) => {
                this.lessons = lessons;
            },
            (error) => {
                console.error('Error fetching lessons:', error);
            }
        );
    }
}

