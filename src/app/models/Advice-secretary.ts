export class AdviceSecretary {
  constructor(public id: string, public topic: string,
    public id_subject: string, public description: string,
    public date: string, public start_time: string,
    public end_time: string, public id_teacher: string,
    public students:string[]) { }
}
