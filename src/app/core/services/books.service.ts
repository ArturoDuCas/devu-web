import {inject, Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";
import {convertSnaps} from "@utils/db";
import {Book} from "@models/book";


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private db = inject(AngularFirestore);

  getAllBooks() {
    return this.db.collection(
      'books',
      ref => ref
        .orderBy('title', 'asc'))
      .get()
      .pipe(
        map(snaps => convertSnaps<Book>(snaps))
      );
  }

  getAvailableBooks() {
    return this.db.collection(
      'books',
      ref => ref
        .where('available', '>', 0)
        .orderBy('title', 'asc'))
      .get()
      .pipe(
        map(snaps => convertSnaps<Book>(snaps))
      );
  }

}
