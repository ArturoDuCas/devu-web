import {inject, Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Book} from "@models/book";
import {from, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SellsService {
  private db = inject(AngularFirestore);

  sellBook(book: Book, quantity: number): Observable<void> {
    // first, set the quantity of the book to the new value
    return from(this.db.collection('books').doc(book.id).update({
      available: book.available - quantity
    })).pipe(
      switchMap(() => {
        // then, create a new sell record
        return from(this.db.collection('sells').add({
          book: book,
          quantity: quantity,
          date: new Date()
        }));
      }),
      switchMap(() => {
        // return an observable of void
        return from(Promise.resolve());
      })
    );
  }
}
