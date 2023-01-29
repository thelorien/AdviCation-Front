import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdvicesComponent } from './list-advices.component';

describe('ListAdvicesComponent', () => {
  let component: ListAdvicesComponent;
  let fixture: ComponentFixture<ListAdvicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdvicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdvicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
