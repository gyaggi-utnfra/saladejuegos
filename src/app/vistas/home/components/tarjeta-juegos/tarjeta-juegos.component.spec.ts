import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaJuegosComponent } from './tarjeta-juegos.component';

describe('TarjetaJuegosComponent', () => {
  let component: TarjetaJuegosComponent;
  let fixture: ComponentFixture<TarjetaJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaJuegosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
