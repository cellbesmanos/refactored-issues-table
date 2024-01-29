import IssuesTable from "./core/components/IssuesTable"
import IssuesServices from "./core/services/IssuesServices"

function App() {
  const issueServices = new IssuesServices();
  const issues = issueServices.GetIssues();

  return (
    <main>
      <h1>Hello World!</h1>

      <IssuesTable issues={issues} />
    </main>
  )
}

export default App
