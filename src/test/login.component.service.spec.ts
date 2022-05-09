import {TestBed} from "@angular/core/testing";
import {LoginComponent} from "../app/login/login.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "../app/_services/auth.service";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../app/_services/token-storage.service";

describe('Login component', () =>{
  let loginComponent : LoginComponent;
  let auth: AuthService;
  let token: TokenStorageService;
  let httpTestingController: HttpTestingController
  let http: HttpClient

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginComponent,AuthService, TokenStorageService]
    });
    loginComponent = TestBed.inject(LoginComponent)
    auth = TestBed.inject(AuthService)
    token = TestBed.inject(TokenStorageService)
    http = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('Login created', () =>{
      expect(loginComponent).toBeDefined();
  })
})
