import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/core/models/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/core/services/messaging.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories = ['personal', 'work'];
  notes: Note[];
  note: Note = {
    title: '',
    description: '',
    done: false,
    category: ''
  };
  panelOpenState = false;
  user: User;
  message: any = {};
  constructor(
    private noteService: NotesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private messagingService: MessagingService
  ) {
    this.messagingService.getPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  ngOnInit() {
    this.authService.logedUser().subscribe(resp => {
      console.log(resp);
      if (resp === null) {
        this.router.navigate(['auth/login']);
      } else {
        this.user = {
          uid: resp.uid,
          displayName: resp.displayName,
          email: resp.email
        };
        this.noteService.getNotes(this.user.uid).subscribe(note => {
          this.notes = note;
          console.log(this.notes);
        });
      }
    });
  }

  saveNote() {
    console.log(this.note);
    if (this.note.id === undefined) {
      this.note.createdOn = new Date().getTime();
      console.log('Entro al if de solo add()');
      this.noteService
      .setNote(this.user.uid, this.note)
      .then(() => {
        this.SaveSuccesed();
      })
      .catch(e => console.error('saveNote', e));
    } else {
      this.noteService
      .updateNote(this.user.uid, this.note)
      .then(() => {
        this.SaveSuccesed();
      })
      .catch(e => console.error('editNote', e));
    }
  }

  private SaveSuccesed() {
    this.clearNote();
    this.snackBar.open('Note Saved 😸', 'Notes', {
      duration: 2000
    });
    this.panelOpenState = !this.panelOpenState;
  }

  clearNote() {
    this.note = {
      id: null,
      title: '',
      description: '',
      createdOn: null,
      done: false,
      category: ''
    };
  }

  seleccionarNota(note: Note) {
    this.note = note;
    this.panelOpenState = this.panelOpenState
      ? this.panelOpenState
      : !this.panelOpenState;
  }

  openDialog(note: Note): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { ...note }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNota(note);
      }
    });
  }
  deleteNota(note: Note) {
    this.noteService
      .deleteNote(this.user.uid, note)
      .then(() => {
        console.log('borrado');
        this.snackBar.open('Note deleted', null, {
          duration: 2000
        });
      })
      .catch(() => {
        console.log('error al borrar');
      });
  }
}
