import { Component, OnInit } from '@angular/core';
import { Worker, CreateWorker } from 'src/app/interfaces/workers-interface';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  workers: Worker[] = [];
  showAddWorkerModal: boolean = false;
  showEditWorkerModal: boolean = false;
  workerId!: number;

  constructor(
    private workersService: UsersServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadWorkers();
  }

  loadWorkers(): void { 
    this.workersService.getWorkers().subscribe(
      (workers) => {
        console.log(workers)
        this.workers = workers
      },
      (error) => {
        console.log('Error loading users:', error);
      }
    )
  }  

  openAddWorkerModal(): void {
    this.showAddWorkerModal = true
    console.log('modal')
  }


  closeAddWorkerModal(): void {
    this.showAddWorkerModal = false;
  }

  onAddWorker(newWorker: CreateWorker): void {
    if (!newWorker.name || !newWorker.email || !newWorker.role) {
      console.log('Por favor, completa todos los campos del formulario.');
      Swal.fire('Error', 'Debes completar todos los campos.');
      return;
  }
  this.workersService.addWorker(newWorker).subscribe(
    (createdWorker) => {
      this.workers.push(createdWorker);
      this.closeAddWorkerModal();
      this.loadWorkers();
      console.log('Se agrego trabajador', createdWorker)
    },
    (error) => {
      console.log('Error al agregar trabajador', error)
    }
  )
}

openEditWorkerModal(worker: Worker): void {
  this.showEditWorkerModal = true;
  this.workerId = worker.id // Create a copy of the worker to avoid modifying the original data
}


closeEditWorkerModal(): void {
  this.showEditWorkerModal = false;
}

onEditWorker(updatedWorker: Worker): void {
  const index = this.workers.findIndex((w) => w.id === updatedWorker.id);
  if (index !== -1) {
    this.workers[index] = updatedWorker
  }
  this.closeEditWorkerModal();
}

onDeleteWorker(worker: Worker): void {
  Swal.fire({
    title: '¿Seguro que deseas eliminar los datos de este empleado?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      this.workersService.deleteWorker(worker.id).subscribe(
        (res) => {
          this.workers = this.workers.filter((w) => w.id !== worker.id);
          console.log("Se elimino", res, worker);
          Swal.fire(
            'Listo!',
            'Se eliminó correctamente la información del empleado.',
            'success'
          )
        },
        (error) => {
          console.log("error al eliminar", error)
          Swal.fire('Error', 'No se eliminó la información', error);
        }
      )
    }
  })
}

goToProducts() {
  this.router.navigate(['admin/products'])
}
}
