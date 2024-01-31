import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent {
  private firestore: Firestore = inject(Firestore);
  users$: Observable<UserProfile[]>;

  constructor() {
    // get a reference to the user-profile collection
    const userProfileCollection = collection(this.firestore, 'users');
    const q = query(userProfileCollection);

    // get documents (data) from the collection using collectionData
    this.users$ = collectionData(q) as Observable<UserProfile[]>;
}
}

export interface UserProfile {
  username: string;
}
