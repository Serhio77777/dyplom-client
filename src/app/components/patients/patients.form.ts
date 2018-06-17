import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsFormModel } from './patients.model';
import { format } from 'date-fns';

/*
  ReactiveForm structure class
*/
export default class PatientsForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: PatientsFormModel;

  constructor(model: PatientsFormModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm(): void {
    this.formGroup = this.formBuilder.group({
      searchValue: new FormControl(this.model.searchValue),
      dataType: new FormControl(this.model.dataType),
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
  get formData(): PatientsFormModel {
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
