import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAdviceComponent } from './cancel-advice.component';

describe('CancelAdviceComponent', () => {
  let component: CancelAdviceComponent;
  let fixture: ComponentFixture<CancelAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelAdviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
