import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICatBreed } from 'src/app/interfaces/ICatBreed';
import { CatService } from 'src/app/services/cat.service';
import * as bootstrap from 'bootstrap';
import { ICatBreedImage } from 'src/app/interfaces/ICatBreedImage';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit, AfterViewInit {
  // Component properties
  public breeds: ICatBreed[] = [];
  public selectedBreed: string = '';
  public breedData: ICatBreed | null = null;
  public breedImage: ICatBreedImage | null = null;

  // DOM element references
  @ViewChild('myCarousel')
  breedCarousel!: ElementRef;

  constructor(private catService: CatService) { }

  ngAfterViewInit(): void {
    if (this.breedCarousel === undefined) return;

    const breedCarouselElement = this.breedCarousel.nativeElement;
    new bootstrap.Carousel(breedCarouselElement, {
      interval: 2000,
      wrap: false
    });
  }

  ngOnInit(): void {
    this.catService.getBreeds().subscribe((data: any) => {
      this.breeds = data;

      if (data.length > 0) {
        this.selectedBreed = data[0].id;
        this.getBreedData(this.selectedBreed);
      }
    });
  }

  onBreedChange(event: Event): void {
    this.selectedBreed = (event.target as HTMLSelectElement).value;
    this.getBreedData(this.selectedBreed);
  }

  getBreedData(breedId: string): void {
    this.catService.getBreedById(breedId).subscribe((data: any) => {
      this.breedData = data;
      this.getBreedImage(data.image_id);
    });
  }

  getBreedImage(imageId: string): void {
    this.catService.getBreedImage(imageId).subscribe((data: any) => {
      this.breedImage = data;
    });
  }
}
