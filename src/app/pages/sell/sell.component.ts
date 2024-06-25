import {Component, inject, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BooksService} from "@services/books.service";
import {Book} from "@models/book";
import {InputNumberModule} from "primeng/inputnumber";
import {Button} from "primeng/button";
import {ToastService} from "@services/toast.service";
import {SellsService} from "@services/sells.service";

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule,
    Button
  ],
  templateUrl: './sell.component.html',
})
export class SellComponent implements OnInit {
  private bookService = inject(BooksService);
  private toastService = inject(ToastService);
  private sellsService = inject(SellsService);

  books: Book[] = [];

  ngOnInit() {
    this.bookService.getAvailableBooks().subscribe(books => {
      this.books = books;
    });
  }


  sellForm: FormGroup = new FormGroup({
    book: new FormControl(''),
    quantity: new FormControl('0'),
  })

  onSubmit() {
    const { quantity, book } = this.sellForm.value;

    // verify that a book is selected
    if (!book) {
      this.toastService.showError('Oops!', 'Debes seleccionar un libro');
      return;
    }

    // verify that quantity > 0
    if (quantity <= 0) {
      this.toastService.showError('Oops!', 'La cantidad debe ser mayor a 0');
      return;
    }

    // verify that the quantity is minor or equal to the available quantity
    if(book.available < quantity) {
      this.toastService.showError('Oops!', 'La cantidad a vender es mayor a la cantidad disponible');
      return;
    }


    this.sellsService.sellBook(book, quantity).subscribe(() => {
      this.toastService.showSuccess('¡Venta exitosa!', `Se vendieron ${quantity} unidades de ${book.title}`);
      this.sellForm.reset();

      //update the available books
      this.bookService.getAvailableBooks().subscribe(books => {
        this.books = books;
      });
    });
  }


}
