import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Worker } from 'src/app/interfaces/workers-interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-edit-worker-modal',
  templateUrl: './edit-worker-modal.component.html',
  styleUrls: ['./edit-worker-modal.component.css']
})
export class EditWorkerModalComponent implements OnInit {
  @Input() workerToEdit?: Worker;
  @Output() editWorkerEvent = new EventEmitter<Worker>()
  @Output() closeModalEvent = new EventEmitter<void>();

  editedWorker!: Worker;

  constructor(
    private usersService: UsersServiceService,
    private authService: AuthServiceService) { }

  ngOnInit() {
    // if(this.worker) {
    //   this.editedWorker = {...this.worker};
    // }
  }

  editWorker(): void {
    if (!this.workerToEdit?.name || !this.workerToEdit?.email || !this.workerToEdit?.role) {
      console.log('Por favor, completa todos los campos del formulario.');
      return;
    }
    
    this.editWorkerEvent.emit(this.workerToEdit);
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
