import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/menuInterface';

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
    if (!this.productToEdit?.name || !this.productToEdit?.price || !this.productToEdit?.type || !this.productToEdit?.image) {
      console.log('Por favor completa todos los campos')
      return;
    }
    this.editProductEvent.emit(this.productToEdit);
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
