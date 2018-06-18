export default class ScheduleModel {
  public tableIdexes: any = ['position', 'day', 'time', 'actions'];
  public tableData: any = [];
  public buzyTableIdexes: any = ['position', 'day', 'time', 'actions'];
  public buzyTableData: any = [];
  public saveData: any = [];
  public date: any = new Date();
  public dateNew: any = '';
  public timeNew: any = '';
  public dataSchedule: any = {};
}
