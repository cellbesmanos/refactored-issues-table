import { useState } from 'react'
import GetIssuesQuery from '../models/GetIssuesQuery';

export default function IssuesTable({ issues } : { issues: { [key:string] : GetIssuesQuery } }) {
  const [issuesEntries, setIssuesEntries] = useState(issues);

  function handleIssueClick(key: string) {
    setIssuesEntries((prev) => {
      const ie = prev[key];
      ie.IsSelected = !ie.IsSelected;
      
      return {
        ...prev,
      }
    });
  }

  return (
    <div>
      <h2>IssuesTable</h2>

      <table style={{textAlign: 'left'}}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="select-all" />
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
