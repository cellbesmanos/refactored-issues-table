import { IssueStatus } from "./Issue";

class GetIssuesQuery {
  Id: string;
  Name: string;
  Message: string;
  Status: IssueStatus;    
  IsSelected: boolean;

  constructor(id: string, name: string, message: string, status: IssueStatus, isSelected: boolean) {
    this.Id = id;
    this.Name = name,
    this.Message =  message,
    this.Status = status,
    this.IsSelected = isSelected
  }

  get IsResolved() : boolean {
    return this.Status === IssueStatus.Resolved;
  }
}

export default GetIssuesQuery;