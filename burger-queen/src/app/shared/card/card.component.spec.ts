import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports:[HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.order = {
      id: 1,
      client: 'John Doe',
      products: [
        { id: 1, name: 'Producto 1', price: 10, quantity: 2, dateEntry: '2023-08-14', image: '', type: 'Almuerzo' },
        { id: 2, name: 'Producto 2', price: 15, quantity: 3, dateEntry: '2023-08-14', image: '', type: 'Desayuno' },
      ],
      status: 'pending',
      dateEntry: '2023-08-14T12:00:00Z',
      mesa: '1',
      currentTime: null,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
