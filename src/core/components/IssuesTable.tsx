import { useState } from 'react'
import GetIssuesQuery from '../models/GetIssuesQuery';

export default function IssuesTable({ issues } : { issues: { [key:string] : GetIssuesQuery } }) {
  const [issuesEntries, setIssuesEntries] = useState(issues);
  const [selectAll, setSelectAll] = useState(false);

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
    const nextIsSelectAll = !selectAll;
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
    setSelectAll(nextIsSelectAll);
  }

  return (
    <div>
      <h2>IssuesTable</h2>

      <table style={{textAlign: 'left'}}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="select-all" checked={selectAll} onChange={handleSelectAll} />
            </th>
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
