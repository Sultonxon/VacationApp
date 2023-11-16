
export class VacationModel{
  public id?: string;
  public dateFrom?: Date;
  public dateTo?: Date;
  public comment?: string;
  public reason?: string;
  public vacationStatusId?: string;
  public status?: {
    id?: string;
    name?: string;
  }
  public userId?: string;
}
