import { Routes } from '@angular/router';
import { EditUserComponent } from '../components/edit-user/edit-user.component';
import { MenuComponent } from '../components/menu/menu.component';
import { AuthComponent } from '../components/auth/auth.component';
import { HomeComponent } from '../components/home/home.component';
import { CourseListComponent } from '../components/course-list/course-list.component';
import { CourseComponent } from '../components/course/course.component';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { LessonListComponent } from '../components/lesson-list/lesson-list.component';
import { ManagementLessonComponent } from '../components/lesson-management/lesson-management.component';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    {
        path: 'menu', component: MenuComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'course', component: CourseListComponent },
            {
                path: 'course/:id', component: CourseComponent, children: [
                    { path: 'lessons', component: LessonListComponent }, // נתיב לשיעורים
                    // { path: 'lessons/:lessonId', component: LessonComponent }, // נתיב לשיעור ספציפי
                ]
            },
            {
                path: 'course-management', component: CourseManagementComponent, children: [
                    { path: 'lesson-management/:courseId', component: ManagementLessonComponent }
                ]
            },
        ]
    },
    { path: '', redirectTo: '/auth', pathMatch: 'full' }
];