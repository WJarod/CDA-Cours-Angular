import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Offer } from 'src/app/buisness/offer/models/offer';
import { OfferService } from 'src/app/buisness/offer/services/offer.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private offerService: OfferService,
  ) { }

  createOfferForm = this.formBuilder.nonNullable.group({
    id: this.getRandomInt().toString(),
    designation: [''],
    description: [''],
    contract: [''],
    salary: [''],
    isApply: false,
    isFavorite: false,
    isBlacklisted: false,
    isOpen: false,
  });

  ngOnInit(): void {
  }

  getRandomInt(): String {
    return Math.floor(Math.random() * 10000000000000000000).toString();
  }

  async onSubmit(): Promise<void> {
    let objet = this.createOfferForm.value as Offer;
    console.log(this.createOfferForm.value);
    this.createOfferForm.reset();
    this.offerService.addOffer(objet);
    this.router.navigate(['/home']);
  }
}
