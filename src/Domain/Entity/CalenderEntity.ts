type SubjectType = {
  date: string;
  deadline: string;
  endTime: string;
  estimatedTime: number;
  label: number;
  name: string;
  startTime: string;
}

class CalenderEntity {
  private day: string;
  private subject: SubjectType[];

  constructor(
    day: string,
    subject: SubjectType[]
  ){
    this.day = day;
    this.subject = subject;
  }
};

export default CalenderEntity;