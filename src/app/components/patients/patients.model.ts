import { MatTableDataSource } from '@angular/material';

export class PatientsModel {
  public tableIdexes: any = ['position', 'patient', 'diagnosis', 'status', 'date'];
  public rootTableIdexes: any = ['position', 'patient', 'dateBorn', 'actions'];
  public cardData: any = [];
  public tableData: any = new MatTableDataSource([]);
}

export class PatientsFormModel {
  public searchValue: string = '';
  public dataType: string = 'table';
}
