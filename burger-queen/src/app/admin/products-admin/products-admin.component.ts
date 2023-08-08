import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProduct, Product } from 'src/app/interfaces/menuInterface';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  products: Product[] = [];
  showAddProductModal = false;
  showEditProductModal = false;
  productToEdit?: Product;

  constructor(
    private productsService :ProductsServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();  
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(
      (products) => {
        console.log("products",products);
        this.products = products
      },
      (error) => {
        console.log(error)
      }
    )
  }

  showMenu(type: string) {
    this.productsService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data.filter(product => product.type === type);
    })
  }

  openAddProductModal():void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.showAddProductModal = false;
  }

  onAddProduct(newProduct: CreateProduct): void {
    Swal.fire({
      title: '¿Guardar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        container: 'custom-swal-container',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if(!newProduct.name || !newProduct.price || !newProduct.type || !newProduct.image) {
        console.log('Por favor ingresa todos lo campos del formulario')
        Swal.fire('Error', 'Debes completar todos los campos para continuar.');
        return;
      }
      this.productsService.addProduct(newProduct).subscribe(
        (createProduct) => {
          this.products.push(createProduct);
          this.closeAddProductModal();
          this.loadProducts();
          console.log('Se agrego el producto', createProduct);
          Swal.fire(
            'Listo!',
            'Se agregó correctamente el nuevo producto.',
            'success'
          )
        },
        (error) => {
          console.log('error al agregar producto', error);
          Swal.fire('Error', 'Error al agregar producto', error);
        }
      )
    }
  })
  }

  onDeleteProduct(product: Product) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(product.id).subscribe(
          (res) => {
            this.products = this.products.filter((p) => p.id !== product.id);
            console.log('Se elimio el producto', res, product);
            Swal.fire(
              'Listo!',
              'Se eliminó correctamente el producto.',
              'success'
            )
          },
          (error) => {
            console.log("Error", error);
          Swal.fire('Error', 'No se eliminó el producto', error);
          }
        )
      }
    })
  }

  openEditProductModal(product: Product): void {
    this.productToEdit = { ...product };
    this.showEditProductModal = true;
  }

  closeEditModal(): void {
    this.showEditProductModal = false;
    this.productToEdit = undefined
  }

  onEditProduct(updatedProduct: Product): void {
    this.productsService.updateProduct(updatedProduct).subscribe(
      (res) => {
        const index = this.products.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = res;
        }
        console.log('Se actualizo el producto', res);
        this.closeEditModal();
        this.loadProducts();
      },
      (error) => {
        console.log('Error al actualizar producto', error);
        Swal.fire('Error', 'No se guardaron correctamente los cambios.', error);
      }
    )
  }

  goToWorkers() {
    this.router.navigate(['admin/workers'])
  }

}
