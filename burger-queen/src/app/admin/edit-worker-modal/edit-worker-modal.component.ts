import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Worker } from 'src/app/interfaces/workers-interface';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-edit-worker-modal',
  templateUrl: './edit-worker-modal.component.html',
  styleUrls: ['./edit-worker-modal.component.css']
})
export class EditWorkerModalComponent implements OnInit {
  @Input() worker?: Worker;
  @Output() editWorkerEvent = new EventEmitter<Worker>()
  @Output() closeModalEvent = new EventEmitter<void>();

  editedWorker!: Worker;

  constructor(private usersService: UsersServiceService) { }

  ngOnInit() {
    if(this.worker) {
      this.editedWorker = {...this.worker};
    }
  }

  editWorker(): void {
    this.usersService.editWorker(this.editedWorker).subscribe(
      (updatedWorker) => {
        this.editWorkerEvent.emit(updatedWorker);
        this.closeModal()
      },
      (error) => {
        console.log('Error editing user', error);
      }
    )
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
