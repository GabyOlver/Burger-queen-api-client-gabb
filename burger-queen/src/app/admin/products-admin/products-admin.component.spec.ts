import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsAdminComponent } from './products-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ProductsAdminComponent', () => {
  let component: ProductsAdminComponent;
  let fixture: ComponentFixture<ProductsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsAdminComponent],
      imports:[HttpClientTestingModule, SharedModule],
    });
    fixture = TestBed.createComponent(ProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
