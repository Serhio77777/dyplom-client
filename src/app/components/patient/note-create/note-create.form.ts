import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import NoteCreateFormModel from './note-create.model';
import { format } from 'date-fns';

/*
  ReactiveForm structure class
*/
export default class NoteCreateForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: NoteCreateFormModel;

  constructor(model: NoteCreateFormModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm(): void {
    this.formGroup = this.formBuilder.group({
      noteDescription: new FormControl(this.model.noteDescription),
      noteDiagnosis: new FormControl(this.model.noteDiagnosis),
      noteStatus: new FormControl(this.model.noteStatus)
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.noteDateCreation = format(new Date(), 'YYYY-MM-DD');
      this.model.noteDescription = data.noteDescription;
      this.model.noteDiagnosis = data.noteDiagnosis;
      this.model.noteStatus = data.noteStatus;
    });
  }

  // form update
  public patchForm(data: any): void {
    this.formGroup.patchValue(data);
    Object.keys(data).forEach(field => {
      this.model[field] = data[field];
    });
  }

  // get form property name
  public getControl(name: string) {
    return this.formGroup.get(name);
  }

  // get form validation status
  get isValid() {
    return this.formGroup.valid;
  }

  // get group value
  get formData(): NoteCreateFormModel {
    return this.formGroup.getRawValue();
  }

  // start form validation
  public validate(): void {
    this.validateFormFields(this.formGroup);
  }

  // form validation functionality
  public validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
}
