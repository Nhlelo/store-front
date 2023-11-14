import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../products/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() item! :Product ;
  constructor(private router : Router){

  }
  ngOnInit(): void {
    console.log(this.item)
  }

  gotoDetails(id:number){
    this.router.navigate([`/details/${id}`])
  }
}
