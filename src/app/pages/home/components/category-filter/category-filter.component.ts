import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Category} from "@models/category";
import {CategoriesService} from "@services/categories.service";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './category-filter.component.html',
})
export class CategoryFilterComponent implements OnInit {
  private categoriesService = inject(CategoriesService)

  @Output() categoriesChange = new EventEmitter<Category[]>();

  categories: Category[] = [];
  selectedCategories: Category[] = [];

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  sendOutput() {
    this.categoriesChange.emit(this.selectedCategories);
  }

}
