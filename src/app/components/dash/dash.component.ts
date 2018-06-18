import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CabinetModel, CabinetFormModel } from './dash.model';
import CabinetForm from './dash.form';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.template.html',
  styleUrls: ['./dash.styles.scss']
})
export class DashComponent implements OnInit, OnDestroy {

  public model: CabinetModel = new CabinetModel(JSON.parse(localStorage.getItem('currentCards'))
  ? JSON.parse(localStorage.getItem('currentCards')) : [
    { title: 'Главная информация', content: ``, cols: 2, rows: 1 },
    { title: 'Lorem', content: ``, cols: 1, rows: 1 },
    { title: 'Lorem', content: ``, cols: 1, rows: 2 },
    { title: 'Lorem', content: ``, cols: 1, rows: 1 }
  ]);
  private modelForm: CabinetFormModel = new(CabinetFormModel);
  private form: CabinetForm;

  constructor(
    private router: Router
  ) {
    this.form = new CabinetForm(this.modelForm);
  }

  private add(): void {
    if (this.form.isValid) {
      this.model.cards.push(JSON.parse(localStorage.getItem('card')));
      localStorage.setItem('cards', JSON.stringify(this.model.cards));
      this.form.patchForm({
        title: '',
        content: '',
        cols: 0,
        rows: 0
      });
      setTimeout(() => {
        this.reset();
      }, 1000);
    }
  }

  private reset(): void {
    this.form.formGroup.markAsPristine();
  }

  private remove(index: number): void {
    this.model.cards = this.model.cards.filter((card, indexItem) => indexItem !== index);
    localStorage.setItem('cards', JSON.stringify(this.model.cards));
  }

  // subscribe on validation success/failure
  public subscribe(): void {
   }

   // unsubscribe on validation success/failure
   public unSubscribe(): void {
   }

   // make subscribe on a component initialization
   public ngOnInit(): void {
    this.form.formGroup.valueChanges.subscribe(data => {
      this.form.model.title = data.title;
      this.form.model.content = data.content;
      this.form.model.cols = data.cols;
      this.form.model.rows = data.rows;
      this.modelForm.title = data.title;
      this.modelForm.content = data.content;
      this.modelForm.cols = data.cols;
      this.modelForm.rows = data.rows;
      if (data.title) {
        localStorage.setItem('card', JSON.stringify(this.modelForm));
      }
    });
     this.subscribe();
   }

   // make unsubscribe before destroying component
   public ngOnDestroy(): void {
     this.unSubscribe();
   }
}
