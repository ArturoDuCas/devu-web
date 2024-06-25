import {Component, inject, Input, OnInit} from '@angular/core';
import {Book} from "@models/book";
import {TableModule} from "primeng/table";
import {BooksService} from "@services/books.service";

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './books-list.component.html',
})
export class BooksListComponent  {
  @Input() books: Book[] = [];
}
