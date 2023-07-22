import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  notes$!: Observable<any[]>;
  noteCollection = collection(this.firestore, 'notes');

  constructor(private firestore: Firestore) { 
    this.getNotes();
  }
  
  // Initialize the 'notiz' object to store the name and note entered by the user in the form
  note = {
    name: '',
    note: ''
  };

  // Array to store the entered notes
  notes: { name: string, note: string }[] = [];

  // This method is called when the form is submitted
  addNote() {
    addDoc(this.noteCollection, this.note);
}

getNotes() {
  this.notes$ = collectionData(this.noteCollection, { idField: 'id' });

  this.notes$.subscribe((note) => {
    console.log(note);
  });
}

deleteNote(id: string) {
  const userDoc = doc(this.noteCollection, id);
  deleteDoc(userDoc);
}

updateNote(id:string){
  const userDoc = doc(this.noteCollection, id);
  updateDoc(userDoc,this.note);
}
}
