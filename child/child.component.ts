import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit{
  x: number = 15.45;
  arr=[1,2,3,4];

  constructor() { }

  ngOnInit(): void {
  }

}
