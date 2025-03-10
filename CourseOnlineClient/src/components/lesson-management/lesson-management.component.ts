import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessonService/lesson.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lesson-management.component.html',
  styleUrl: './lesson-management.component.css'
})

export class ManagementLessonComponent implements OnInit {

  @Input() courseId!: number; 
  lessons: Lesson[] = []; 
  showAddLessonModal: boolean = false;
  showUpdateLessonModal: boolean = false;
  lessonUpdate: Lesson ={id:0,title: "",content: "",courseId:0}


  constructor(private lessonsService: LessonsService,private route:ActivatedRoute) {}

  ngOnInit(): void {
     // קבלת קוד הקורס מה-route params
     this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.loadLessons(); 
    });
  }

  loadLessons(): void {
    this.lessonsService.getLessons(this.courseId).subscribe(
      (lessons) => {
        this.lessons = lessons;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  addLesson(): void {
    this.lessonsService.createLesson(this.courseId, this.lessonUpdate).subscribe(
      () => {
        this.loadLessons();
        this.showAddLessonModal = false;
      },
      (error) => {
        console.error('Error adding lesson:', error);
      }
    );
  }

  editLesson(): void {
    this.lessonsService.updateLesson(this.courseId, this.lessonUpdate.id, this.lessonUpdate).subscribe(
      () => {
        this.loadLessons();
        this.showUpdateLessonModal = false;
      },
      (error) => {
        console.error('Error updating lesson:', error);
      }
    );
  }

  deleteLesson(lessonId: number): void {
    this.lessonsService.deleteLesson(this.courseId, lessonId).subscribe(
      () => {
        this.loadLessons();
      },
      (error) => {
        console.error('Error deleting lesson:', error);
      }
    );
  }

  openAddLessonModal(): void {
    this.lessonUpdate ={id:0,title: "",content: "",courseId:0}
    this.showAddLessonModal = true;

  }

  closeAddLessonModal(): void {
    this.lessonUpdate ={id:0,title: "",content: "",courseId:0}

    this.showAddLessonModal = false;
  }

  openUpdateLessonModal(lesson: Lesson): void {
    this.lessonUpdate = { ...lesson }; 
    this.showUpdateLessonModal = true;
  }

  closeUpdateLessonModal(): void {
    this.lessonUpdate ={id:0,title: "",content: "",courseId:0}
    this.showUpdateLessonModal = false;
  }
}
