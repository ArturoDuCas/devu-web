import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MultiSelectModule} from "primeng/multiselect";
import {AuthorsService} from "@services/authors.service";
import {Author} from "@models/author";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-author-filter',
  standalone: true,
  imports: [
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './author-filter.component.html',
})
export class AuthorFilterComponent implements OnInit {
  private authorsService = inject(AuthorsService)

  @Output() authorsChange = new EventEmitter<Author[]>();

  authors: Author[] = [];
  selectedAuthors: Author[] = [];

  ngOnInit() {
    this.authorsService.getAllAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  sendOutput() {
    this.authorsChange.emit(this.selectedAuthors);
  }


}
