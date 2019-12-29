import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  deleteNote(uid: string, note: Note) {
    return this.db.collection(`/usuario/${uid}/notes/`).doc(note.id).delete();
  }
  constructor(private db: AngularFirestore) { }

  getNotes(uid: string) {
    return this.db.collection<Note>(`/usuario/${uid}/notes`)
    .valueChanges({idField: 'id'});
  }

  setNote(uid: string, note: Note) {
    return this.db.collection(`/usuario/${uid}/notes/`).add(note);
  }

  updateNote(uid: string, note: Note) {
    return this.db.collection(`/usuario/${uid}/notes/`).doc(note.id).update(note);
  }
}
