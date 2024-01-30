import {  useEffect, useState } from 'react'
import GetIssuesQuery from '../models/GetIssuesQuery';

export default function IssuesTable({ issues } : { issues: { [key:string] : GetIssuesQuery } }) {
  const [issuesEntries, setIssuesEntries] = useState(issues);
  const [isSelectAll, setIsSelectAll] = useState(false);

  let totalSelectedIssues = getTotalSelectIssues();
  
  useEffect(() => {
    totalSelectedIssues = getTotalSelectIssues();
  }, [issuesEntries]);

  function handleIssueClick(key: string) {
    setIssuesEntries((prev) => {
      const ie = prev[key];
      if(ie == null || ie.IsResolved) {
        return prev;
      } 

      ie.IsSelected = !ie.IsSelected;
      
      return {
        ...prev,
      }
    });
  }

  function handleSelectAll() {
    const nextIsSelectAll = !isSelectAll;
    setIssuesEntries((prev) => {
      for(const key of Object.keys(prev)) {
        const issue = prev[key];
        if(!issue.IsResolved) {
          issue.IsSelected = nextIsSelectAll;
        }
      }
      
      return {
        ...prev
      }
    });

    setIsSelectAll(nextIsSelectAll);
  }

  function getTotalSelectIssues() : number {
    return Object.values(issuesEntries)
    .filter(issue => issue.IsSelected && !issue.IsResolved)
    .length;
  }

  return (
    <div>
      <h2>IssuesTable</h2>

      <table style={{textAlign: 'left'}}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="select-all" checked={isSelectAll} onChange={handleSelectAll} />
            </th>
            <th>{totalSelectedIssues <= 0 ? "None Selected" : `${totalSelectedIssues} Selected`}</th>
            <th></th>
            <th></th>
          </tr>

          <tr>
            <th></th>
            <th>Name</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {
            Object.keys(issuesEntries).map(key => {
              const ie = issuesEntries[key];
              if(ie == null) {
                return;
              }

              return (
                <tr key={ie.Id} style={{color: ie.IsSelected ? "green" : "black"}} onClick={() => handleIssueClick(key)}>
                  <td>
                    <input type="checkbox" name={ie.Name} checked={ie.IsSelected} disabled={ie.IsResolved} readOnly />
                  </td>
                  <td>{ie.Name}</td>
                  <td>{ie.Message}</td>
                  <td>{ie.IsResolved ? "done" : "ongoing"}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
