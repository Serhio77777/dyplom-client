export default class ScheduleModel {
  public tableIdexes: any = ['position', 'patient', 'diagnosis', 'status', 'date'];
  public tableData: any = [
    {position: 1, patient: 'Hydrogen', diagnosis: 1.0079, status: 'H', date: new Date()},
    {position: 2, patient: 'Helium', diagnosis: 4.0026, status: 'He', date: new Date()},
    {position: 3, patient: 'Lithium', diagnosis: 6.941, status: 'Li', date: new Date()},
    {position: 4, patient: 'Beryllium', diagnosis: 9.0122, status: 'Be', date: new Date()},
    {position: 5, patient: 'Boron', diagnosis: 10.811, status: 'B', date: new Date()},
    {position: 6, patient: 'Carbon', diagnosis: 12.0107, status: 'C', date: new Date()},
    {position: 7, patient: 'Nitrogen', diagnosis: 14.0067, status: 'N', date: new Date()},
    {position: 8, patient: 'Oxygen', diagnosis: 15.9994, status: 'O', date: new Date()},
    {position: 9, patient: 'Fluorine', diagnosis: 18.9984, status: 'F', date: new Date()},
    {position: 10, patient: 'Neon', diagnosis: 20.1797, status: 'Ne', date: new Date()}
  ];
}
