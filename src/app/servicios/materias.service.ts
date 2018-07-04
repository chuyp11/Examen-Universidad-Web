import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Materia } from '../modelos/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  materiasCollection: AngularFirestoreCollection<Materia>;
  materias: Observable<Materia[]>;
  materiaDoc: AngularFirestoreDocument<Materia>;

  constructor(private afs: AngularFirestore) {
    this.materiasCollection = afs.collection<Materia>('materias');
    this.materias = this.materiasCollection.valueChanges();
   }

  lectura() {
    return this.materias;
  }

  alta(materia: Materia) {
    const id = this.afs.createId();
    materia.id = id;
    this.materiasCollection.doc(id).set(materia);
  }

  baja(materia: Materia) {
    this.materiaDoc = this.afs.doc<Materia>(`materias/${materia.id}`);
    this.materiaDoc.delete();
  }

  cambio(materia: Materia) {
    this.materiaDoc = this.afs.doc<Materia>(`materias/${materia.id}`);
    this.materiaDoc.update(materia);
  }
}
