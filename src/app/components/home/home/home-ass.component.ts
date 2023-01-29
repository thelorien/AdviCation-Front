import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-ass',
  templateUrl: './home-ass.component.html',
  styleUrls: ['./home-ass.component.css']
})
export class HomeComponent implements OnInit {

  bookForm: FormGroup;

  slides = [
    { 'image': '../../../../assets/images/home/image1.png' },
    { 'image': '../../../../assets/images/home/image2.png' },
    { 'image': '../../../../assets/images/home/image3.png' },
    { 'image': '../../../../assets/images/home/image4.png' },
    { 'image': '../../../../assets/images/home/image5.png' },
    { 'image': '../../../../assets/images/home/image6.png' },
    { 'image': '../../../../assets/images/home/image7.png' },
    { 'image': '../../../../assets/images/home/image8.png' },
    { 'image': '../../../../assets/images/home/image9.png' }
  ];


  constructor() {
    this.bookForm = new FormGroup({
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl('', [Validators.required]),
      guestNumber: new FormControl('', [Validators.required, Validators.min(0), Validators.max(6)])
    })
  }

  ngOnInit(): void {
  }



}
