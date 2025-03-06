import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/courseService/course.service';
import { Course } from '../../models/course.model';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [NgTemplateOutlet,FormsModule,CourseComponent],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit{

  courses: Course[] = [];
  showAddCourseModal: boolean = false;
  showUpdateCourseModal:boolean=false;

  courseUpdate:Course={title:"",description:"",teacherId:0,id:0}

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  addCourse() {
    this.courseService.createCourse(this.courseUpdate.title,this.courseUpdate.description).subscribe(() => {
      this.loadCourses();
      this.showAddCourseModal = false;
    });
  }

  editCourse() {
    this.courseService.updateCourse(this.courseUpdate.id,this.courseUpdate.title,this.courseUpdate.description).subscribe(()=>{
      this.loadCourses();
      this.showUpdateCourseModal = false;
    })
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }

  openAddCourseModal() {
    this.courseUpdate={title:"",description:"",teacherId:0,id:0}
    this.showAddCourseModal = true;
  }

  closeAddCourseModal() {
    this.courseUpdate={title:"",description:"",teacherId:0,id:0}
    this.showAddCourseModal = false;
  }
  openUpdateCourseModal(course:Course) {
    // this.courseUpdate.title=course.title
    // this.courseUpdate.description=course.description
    // this.courseUpdate.id=course.id
    this.courseUpdate={...course}
    this.showUpdateCourseModal = true;
  }

  closeUpdateCourseModal() {
    this.courseUpdate={title:"",description:"",teacherId:0,id:0}
    this.showUpdateCourseModal = false;
  }
}