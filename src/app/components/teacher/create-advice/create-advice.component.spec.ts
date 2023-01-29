import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdviceComponent } from './create-advice.component';

describe('CreateAdviceComponent', () => {
  let component: CreateAdviceComponent;
  let fixture: ComponentFixture<CreateAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
