import {Component, inject, OnInit} from '@angular/core';
import {AuthorFilterComponent} from "./components/author-filter/author-filter.component";
import {CategoryFilterComponent} from "./components/category-filter/category-filter.component";
import {TitleFilterComponent} from "./components/title-filter/title-filter.component";
import {BooksListComponent} from "./components/books-list/books-list.component";
import {BooksService} from "@services/books.service";
import {Book} from "@models/book";
import {Category} from "@models/category";
import {Author} from "@models/author";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AuthorFilterComponent,
    CategoryFilterComponent,
    TitleFilterComponent,
    BooksListComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private bookService = inject(BooksService);

  books: Book[] = [];
  filteredBooks: Book[] = [];

  filterByTitleState: string = '';
  filterByCategoryState: Category[] = [];
  filterByAuthorState: Author[] = [];

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
    });
  }

  filterByCategory($event: Category[]) {
    this.filterByCategoryState = $event;
    this.applyFilters();
  }

  filterByAuthor($event: Author[]) {
    this.filterByAuthorState = $event;
    this.applyFilters();
  }

  filterByTitle($event: string) {
    this.filterByTitleState = $event;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredBooks = this.books
      .filter(book => this.filterByTitleState ? book.title.includes(this.filterByTitleState) : true)
      .filter(book => this.filterByAuthorState.length > 0 ? this.filterByAuthorState.some(author => author.id === book.author.id) : true)
      .filter(book => this.filterByCategoryState.length > 0 ? this.filterByCategoryState.some(category => category.id === book.category.id) : true);
  }

}
