
enum IssueStatus {
  Ongoing = "Ongoing",
  Resolved = "Resolved"
} 

class Issue {
  Id: string = crypto.randomUUID();
  Status: IssueStatus;
  Name: string;
  Message: string;

  constructor(name: string, message: string, status = IssueStatus.Ongoing) {
    this.Name = name;
    this.Message = message;
    this.Status = status;
  }
}

export { Issue, IssueStatus }

