import { format } from 'date-fns';

export class CabinetModel {
  public personData: any = {};

  constructor(personData: any) {
    this.personData = personData;
    this.personData.practitionerDateBirth = format(this.personData.practitionerDateBirth, 'YYYY-MM-DD');
  }
}

export class CabinetFormModel {
  public practitionerDateBirth: string = '';
  public practitionerEmail: string = '';
  public practitionerFirstName: string = '';
  public practitionerSurName: string = '';
  public practitionerLastName: string = '';
  public practitionerPosition: string = '';
  public practitionerSex: string = '';
  public password: string = '';
  // public passwordConfirm: string = '';
}
