import { Component, OnInit } from '@angular/core';

export class Grades {
  constructor(
    public id: number,
    public user: string,
    public subjects: string,
    public grade: number
  ) {
  }
}

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
