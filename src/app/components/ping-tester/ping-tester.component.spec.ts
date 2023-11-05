import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingTesterComponent } from './ping-tester.component';

describe('PingTesterComponent', () => {
  let component: PingTesterComponent;
  let fixture: ComponentFixture<PingTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PingTesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PingTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
