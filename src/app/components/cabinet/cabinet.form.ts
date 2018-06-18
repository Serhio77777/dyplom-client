import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CabinetFormModel } from './cabinet.model';
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
      practitionerDateBirth: new FormControl(this.model.practitionerDateBirth),
      practitionerEmail: new FormControl(this.model.practitionerEmail),
      practitionerFirstName: new FormControl(this.model.practitionerFirstName),
      practitionerSurName: new FormControl(this.model.practitionerSurName),
      practitionerLastName: new FormControl(this.model.practitionerLastName),
      practitionerPosition: new FormControl(this.model.practitionerPosition),
      practitionerSex: new FormControl(this.model.practitionerSex),
      password: new FormControl(this.model.password)
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.practitionerFirstName = data.practitionerFirstName;
      this.model.practitionerSurName = data.practitionerSurName;
      this.model.practitionerLastName = data.practitionerLastName;
      this.model.practitionerDateBirth = format(data.practitionerDateBirth, 'YYYY-MM-DD');
      this.model.practitionerEmail = data.practitionerEmail;
      this.model.practitionerPosition = data.practitionerPosition;
      this.model.practitionerSex = data.practitionerSex;
      this.model.password = data.password;
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
