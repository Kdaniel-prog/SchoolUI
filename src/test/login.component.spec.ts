import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LoginComponent} from "../app/login/login.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "../app/_services/auth.service";
import {TokenStorageService} from "../app/_services/token-storage.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('Login component', () =>{
  let loginComponent : LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async() =>{
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [AuthService, TokenStorageService]
    });
    fixture =  TestBed.createComponent(LoginComponent)
    loginComponent = fixture.componentInstance
    loginComponent.ngOnInit();
    fixture.detectChanges()
  });

  it('Login component created', () =>{
      expect(loginComponent).toBeDefined();
  })
  it('Login button created test', () =>{
    expect(fixture.debugElement.nativeElement.querySelector('button')).toBeDefined();
  })
})
