import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/operators';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
 exercises: Exercise[];
 exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm) {
   this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
