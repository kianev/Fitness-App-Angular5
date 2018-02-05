import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from "../training.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Exercise} from "../exercise.model";
import * as fromTraining from "../training.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
   this.store.select(fromTraining.getFinishedExercises).subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    );
      this.trainingService.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
