import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Worker } from 'src/app/interfaces/workers-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-workers',
  templateUrl: './edit-workers.component.html',
  styleUrls: ['./edit-workers.component.css']
})
export class EditWorkersComponent {
  @Input() workerId!: number;
  @Output() hideEdit = new EventEmitter<boolean>();
  @Output() workerEdited = new EventEmitter<Worker>();
  workerForm!: FormGroup;
  UserInfo!: Worker;

  constructor(
    private fb: FormBuilder,
    private userService: UsersServiceService
  ) {
    this.workerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl()
    })
  }

  ngOnInit() {
    if (this.workerId) {
      this.userService.getWorker(this.workerId).subscribe(
        (user) => {
          this.UserInfo = user;
          this.createForm();
        },
        (error) => {
          console.log(error)
        })
    }
  }

  createForm() {
    this.workerForm = this.fb.group({
      name: [this.UserInfo.name, Validators.required],
      email: [this.UserInfo.email, Validators.required],
      password: [{ value: this.UserInfo.password, disabled: true }, Validators.required],
      role: [this.UserInfo.role, Validators.required]
    })
  }

  editWorker() {
    Swal.fire({
      title: '¿Guardar todos los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        container: 'custom-swal-container', // Define una clase CSS personalizada
    },
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.editWorker(this.UserInfo.id, this.workerForm.value).subscribe(
          (res) => {
            this.UserInfo = res;
            this.workerEdited.emit(this.UserInfo);
            console.log(res);
            Swal.fire(
              'Listo!',
              'Se guardaron correctamente los cambios.',
              'success'
            )
          },
          (error) => {
            console.log('Error', error);
            this.ngOnInit();
            Swal.fire('Error', 'No se guardaron correctamente los cambios.', error);
          }
        )
      }
    })
  }

  // editWorker() {
  //   this.userService.editWorker(this.UserInfo.id, this.workerForm.value).subscribe(
  //     (res) => {
  //       this.UserInfo = res;
  //       this.workerEdited.emit(this.UserInfo);
  //       console.log(res)
  //     }
  //   ),
  //   (error: Error) => {
  //     console.log('Error', error);
  //     this.ngOnInit();
  //   }
  // }

  closeModal() {
    this.hideEdit.emit(false)
  }
}
