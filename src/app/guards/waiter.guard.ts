import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LogOutServiceService } from '../services/log-out-service.service';
import Swal from 'sweetalert2';

export const waiterGuard: CanActivateFn = () => {
  const logOutService = inject(LogOutServiceService);
  const storageService = inject(LocalStorageService);
  const userRole = storageService.getRoleUser();

  if (userRole === 'waiter' || userRole === 'admin') {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No tienes permisos para ingresar a esta ruta, vuelve a loggearte por favor'
    })
    console.log('no tienes permisos');
    logOutService.logOut();
    return false;
  }
};
