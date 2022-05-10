import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testString = "";
  constructor() { }

  ngOnInit(): void {
  }

  testMethod() {
    this.testString = "working";
  }
  get testStringChanged(){
    return this.testString;
  }
}
