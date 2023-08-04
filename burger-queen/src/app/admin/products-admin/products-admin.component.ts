import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProduct, Product } from 'src/app/interfaces/menuInterface';
import { ProductsServiceService } from 'src/app/services/products-service.service';

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
    if(!newProduct.name || !newProduct.price || !newProduct.type || !newProduct.image) {
      console.log('Por favor ingresa todos lo campos del formulario')
      return;
    }
    this.productsService.addProduct(newProduct).subscribe(
      (createProduct) => {
        this.products.push(createProduct);
        this.closeAddProductModal();
        this.loadProducts();
        console.log('Se agrego el producto', createProduct);
      },
      (error) => {
        console.log('error al agregar producto', error)
      }
    )
  }

  onDeleteProduct(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(
      (res) => {
        this.products = this.products.filter((p) => p.id !== product.id);
        console.log('Se elimio el producto', res, product);
      },
      (error) => {
        console.log("Error", error)
      }
    )
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
        console.log('Error al actualizar producto', error)
      }
    )
  }

  goToWorkers() {
    this.router.navigate(['admin/workers'])
  }

}
