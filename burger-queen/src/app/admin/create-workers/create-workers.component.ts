import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CreateWorker } from 'src/app/interfaces/workers-interface';

@Component({
  selector: 'app-create-workers',
  templateUrl: './create-workers.component.html',
  styleUrls: ['./create-workers.component.css']
})
export class CreateWorkersComponent implements OnInit {
  @Output() addWorkerEvent = new EventEmitter<CreateWorker>();
  @Output() closeModalEvent = new EventEmitter<void>();

  newWorker: CreateWorker = {
    id: 0,
    name:'',
    email:'',
    role:'',
    password:'',
  }

  ngOnInit(): void {
    
  }

  addWorker(): void {
    this.addWorkerEvent.emit(this.newWorker);
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    console.log('cerro el modal')
  }
}
