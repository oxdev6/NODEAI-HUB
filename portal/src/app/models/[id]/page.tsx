import { getJSON, API_BASE } from "@/lib/api";
import { Card, CardTitle } from "@/components/Card";
import { CodeSnippet } from "@/components/CodeSnippet";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/Button";

type Model = { id: string; name: string; description?: string; tags?: string[]; stars?: number; downloads?: number };

export default async function ModelDetails({ params }: { params: { id: string } }) {
  const model = await getJSON<Model>(`/v1/models/${encodeURIComponent(params.id)}`);
  const curl = `curl -s -X POST ${API_BASE}/v1/inference/${model.id} -H 'Content-Type: application/json' -d '{"input":"Hello"}'`;
  const js = `import axios from 'axios';
const res = await axios.post('${API_BASE}/v1/inference/${model.id}', { input: 'Hello' });
console.log(res.data);`;
  const py = `import requests
r = requests.post('${API_BASE}/v1/inference/${model.id}', json={'input': 'Hello'})
print(r.json())`;
  const readme = await fetch(`${API_BASE}/v1/models/${encodeURIComponent(model.id)}/readme`).then((r) => r.text()).catch(() => "");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{model.name}</h1>
        <form action={`${API_BASE}/v1/models/${encodeURIComponent(model.id)}/star`} method="post">
          <Button type="submit" variant="secondary">★ Star</Button>
        </form>
      </div>
      {model.description && <div className="text-sm text-gray-600 dark:text-gray-300">{model.description}</div>}
      <Card>
        <CardTitle>Model ID</CardTitle>
        <code className="text-xs break-all">{model.id}</code>
      </Card>
      <Card>
        <CardTitle>Use in API</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CodeSnippet lang="cURL" code={curl} />
          <CodeSnippet lang="JavaScript" code={js} />
          <CodeSnippet lang="Python" code={py} />
        </div>
      </Card>
      {readme && (
        <Card>
          <CardTitle>README</CardTitle>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  );
}


