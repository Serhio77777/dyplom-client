import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import CreateFormModel from './create.model';
import { format } from 'date-fns';

/*
  ReactiveForm structure class
*/
export default class  CreateForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: CreateFormModel;

  constructor(model: CreateFormModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm(): void {
    this.formGroup = this.formBuilder.group({
      patientFirstName: new FormControl(this.model.patientFirstName),
      patientSurName: new FormControl(this.model.patientSurName),
      patientLastName: new FormControl(this.model.patientLastName),
      patientDateBorn: new FormControl(this.model.patientDateBorn),
      patientBloodType: new FormControl(this.model.patientBloodType),
      patientSex: new FormControl(this.model.patientSex),
      patientHeight: new FormControl(this.model.patientHeight),
      patientWeight: new FormControl(this.model.patientWeight)
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.patientFirstName = data.patientFirstName;
      this.model.patientSurName = data.patientSurName;
      this.model.patientLastName = data.patientLastName;
      this.model.patientDateBorn = format(data.patientDateBorn, 'YYYY-MM-DD');
      this.model.patientSex = data.patientSex;
      this.model.patientBloodType = data.patientBloodType;
      this.model.patientHeight = data.patientHeight;
      this.model.patientWeight = data.patientWeight;
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
  get formData(): CreateFormModel {
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
