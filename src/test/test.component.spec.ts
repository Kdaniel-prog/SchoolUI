import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from '../app/test/test.component';
import {LoginComponent} from "../app/login/login.component";

describe('TestComponent', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ]
    })
    fixture =  TestBed.createComponent(TestComponent)
    testComponent = fixture.componentInstance
    fixture.detectChanges()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('test button', () => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(testComponent.testStringChanged).toBe("working");
  });
});
