import {inject, Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Category} from "@models/category";
import {map, Observable} from "rxjs";
import {convertSnaps} from "@utils/db";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private db = inject(AngularFirestore);

  getAllCategories(): Observable<Category[]> {
    return this.db.collection(
      'categories',
      ref => ref
        .orderBy('name', 'asc'))
      .get()
      .pipe(
        map(snaps => convertSnaps<Category>(snaps))
      );
  }

}
