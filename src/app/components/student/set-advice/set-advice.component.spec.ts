import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAdviceComponent } from './set-advice.component';

describe('SetAdviceComponent', () => {
  let component: SetAdviceComponent;
  let fixture: ComponentFixture<SetAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAdviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
