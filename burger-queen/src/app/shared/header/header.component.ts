import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit, OnDestroy {

  fecha: string | null | undefined;
  hora: string | null | undefined;
  private intervalId: any;

  constructor(
    private storage: LocalStorageService,
    private authService: AuthServiceService,
    private date: DatePipe) { }
    
    email = this.storage.getEmail();
    role = this.storage.getRoleUser();
    name = this.storage.getName();

    ngOnInit(): void {
      this.horaFecha();
      this.intervalId = setInterval(() => {
        this.horaFecha();
      }, 1000)
    }

    ngOnDestroy(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }

    horaFecha() {
      this.fecha = this.date.transform(new Date(), 'dd-MM-yyyy');
      this.hora = this.date.transform(new Date(), 'HH:mm:ss'); 
    }

  logout() {
    Swal.fire({
      title: '¿Seguro que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
      }
    })
  }
}
