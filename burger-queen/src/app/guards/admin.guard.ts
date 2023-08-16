import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LogOutServiceService } from '../services/log-out-service.service';
import Swal from 'sweetalert2';


export const adminGuard: CanActivateFn = () => {
  const logOutService = inject(LogOutServiceService);
  const storageService = inject(LocalStorageService);
  const userRole = storageService.getRoleUser();

  if (userRole === 'admin') {
    return true;
  } else {
    console.log('no tienes permisos');
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No tienes permisos para ingresar a esta ruta, vuelve a loggearte por favor'
    })
    logOutService.logOut();
    return false;
  }
};
