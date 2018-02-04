import {Exercise} from "./exercise.model";
import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Subscription} from "rxjs/Subscription";
import {UIService} from "../shared/ui-service";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private avaliableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

 fetchAvaliableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db.collection('avaliableExercises')
     .snapshotChanges()
     .map(docArray => {
       return docArray.map(doc => {
         return {
           id: doc.payload.doc.id,
           name: doc.payload.doc.data().name,
           calories: doc.payload.doc.data().calories,
           duration: doc.payload.doc.data().duration
         }
       });
     })
     .subscribe((exercises: Exercise[]) => {
       this.uiService.loadingStateChanged.next(false);
       this.avaliableExercises = exercises;
       this.exercisesChanged.next([...this.avaliableExercises]);
     }, error => {
       this.uiService.loadingStateChanged.next(false);
       this.uiService.showSnackBar('Fetching Exercises failed, please try again later', null, 3000);
         this.exercisesChanged.next(null);
     }
     ))
 }

 startExercise(selectedId: string) {
   // this.db.doc('avaliableExercises/' + selectedId).update({lastSelected: new Date()});
   this.runningExercise = this.avaliableExercises.find(ex => ex.id === selectedId);
   this.exerciseChanged.next({...this.runningExercise});
 }

 completeExercise() {
   this.addDataToDatabase({
     ...this.runningExercise,
     date: new Date(),
     state: 'completed'
   });
   this.runningExercise = null;
   this.exerciseChanged.next(null);
 }

 cancelExercise(progress: number) {
   this.addDataToDatabase({
     ...this.runningExercise,
     duration: this.runningExercise.duration * (progress / 100),
     calories: this.runningExercise.calories * (progress / 100),
     date: new Date(),
     state: 'canceled'
   });
   this.runningExercise = null;
   this.exerciseChanged.next(null);
 }

 getRunningExercise() {
   return {...this.runningExercise}
 }

 fetchCompletedOrCanceledExercises() {
   this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe(
     (exercises: Exercise[]) => {
       this.finishedExercisesChanged.next(exercises);
     }
   ));
 }

 cancelSubscriptions() {
   this.fbSubs.forEach(sub => sub.unsubscribe());
 }

 private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
 }
}
