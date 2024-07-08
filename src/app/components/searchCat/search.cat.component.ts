import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICatBreed } from 'src/app/interfaces/ICatBreed';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-search-cat',
  templateUrl: './search.cat.component.html'
})
export class SearchCatComponent {
  public breedName: string = "";
  public catBreeds: ICatBreed[] = [];
  public loading: boolean = false;

  constructor(private catService: CatService) { }

  searchCatByBreed() {
    if (this.breedName) {
      this.loading = true;
      this.catBreeds = [];

      this.catService.searchBreeds(this.breedName).subscribe((data: any) => {
        this.catBreeds = data;
        this.loading = false;
      });
    }
  }
}
