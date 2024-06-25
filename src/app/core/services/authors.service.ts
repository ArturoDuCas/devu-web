import {inject, Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Author} from "@models/author";
import {convertSnaps} from "../../shared/utils/db";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private db = inject(AngularFirestore);

  getAllAuthors(): Observable<Author[]> {
    return this.db.collection(
      'authors',
      ref => ref
        .orderBy('name', 'asc'))
      .get()
      .pipe(
        map(snaps => convertSnaps<Author>(snaps))
      );
  }

}
