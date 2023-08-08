import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/menuInterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {
  @Input() productToEdit?: Product;
  @Output() editProductEvent = new EventEmitter<Product>()
  @Output() closeModalEvent = new EventEmitter<void>();

  editedProduct!: Product;

  ngOnInit(): void {
    
  }

  editProduct(): void {
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
        if (!this.productToEdit?.name || !this.productToEdit?.price || !this.productToEdit?.type || !this.productToEdit?.image) {
          console.log('Por favor completa todos los campos')
          Swal.fire('Error', 'Por favor completa todos los campos');
          return;
        }
        this.editProductEvent.emit(this.productToEdit);
        Swal.fire(
          'Listo!',
          'Se guardaron correctamente los cambios.',
          'success'
        )
      }
    })
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
