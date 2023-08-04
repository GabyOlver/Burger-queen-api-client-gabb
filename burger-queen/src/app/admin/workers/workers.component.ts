import { Component, OnInit } from '@angular/core';
import { Worker, CreateWorker } from 'src/app/interfaces/workers-interface';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';
import { EditWorkerModalComponent } from '../edit-worker-modal/edit-worker-modal.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  workers: Worker[] = [];
  showAddWorkerModal = false;
  showEditWorkerModal = false;
  workerToEdit?: Worker;

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
  this.workerToEdit = { ...worker }; // Create a copy of the worker to avoid modifying the original data
  this.showEditWorkerModal = true;
}

closeEditWorkerModal(): void {
  this.showEditWorkerModal = false;
  this.workerToEdit = undefined;
}

onEditWorker(updatedWorker: Worker): void {
  this.workersService.updateWorker(updatedWorker).subscribe(
    () => {
      const index = this.workers.findIndex((worker) => worker.id === updatedWorker.id);
      if (index !== -1) {
        this.workers[index] = { ...updatedWorker };
      }

      this.closeEditWorkerModal();
      console.log('Trabajador actualizado:', updatedWorker);
    },
    (error) => {
      console.log('Error al editar trabajador', error);
    }
  );
}

onDeleteWorker(worker: Worker): void {
  this.workersService.deleteWorker(worker.id).subscribe(
    (res) => {
      this.workers = this.workers.filter((w) => w.id !== worker.id);
      console.log("Se elimino", res, worker);
    },
    (error) => {
      console.log("error al eliminar", error)
    }
  )
}

goToProducts() {
  this.router.navigate(['admin/products'])
}
}
