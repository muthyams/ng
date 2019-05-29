import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-fee',
    templateUrl: './fee.component.html',
    styleUrls: ['./fee.component.css']
  })
  export class FeeComponent implements OnInit {
   
    feeTypes = ["addmission Fee", "school fee","hostel fee", "bus fee","Exam fee", "stationery fee"];
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
  }