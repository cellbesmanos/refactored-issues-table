import { Issue, IssueStatus } from "../models/Issue";
import GetIssuesQuery from "../models/GetIssuesQuery";

const sampleIssues: Array<Issue> = [
  new Issue("TypeError", "Cannot read properties of undefined (reading 'length')"),
  new Issue("TypeError", "U is not a function"),
  new Issue("TypeError", "Cannot define property F: \"obj\" is not extensible"),
  new Issue("TypeError", "Setting getter-only property R"),
  new Issue("ReferenceError", "C is not defined", IssueStatus.Resolved),
];

class IssuesServices {
  GetIssues() : { [key:string] : GetIssuesQuery } {
    const entries = sampleIssues.map(i => 
      [i.Id, new GetIssuesQuery(i.Id, i.Name, i.Message, i.Status, false)]
  );
  return Object.fromEntries(entries);
  }
}

export default IssuesServices;