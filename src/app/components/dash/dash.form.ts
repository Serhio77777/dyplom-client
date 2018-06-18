import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CabinetFormModel } from './dash.model';
import { format } from 'date-fns';

/*
  ReactiveForm structure class
*/
export default class CabinetForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: CabinetFormModel;

  constructor(model: CabinetFormModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm(): void {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(this.model.title, [Validators.required]),
      content: new FormControl(this.model.content, [Validators.required]),
      cols: new FormControl(this.model.cols, [Validators.required]),
      rows: new FormControl(this.model.rows, [Validators.required]),
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
  get formData(): CabinetFormModel {
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
