import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    return sessionStorage.getItem('role') == "teacher"
};