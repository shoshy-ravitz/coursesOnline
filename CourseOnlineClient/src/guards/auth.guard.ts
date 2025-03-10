import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
console.log(sessionStorage.getItem('role') == "teacher");
    return sessionStorage.getItem('role') == "teacher"
};