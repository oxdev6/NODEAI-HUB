import { getJSON, API_BASE } from "@/lib/api";
import { Card, CardTitle, CardDescription } from "@/components/Card";
import { CodeSnippet } from "@/components/CodeSnippet";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { Star, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-col gap-8 animate-fade-in">
      <Link href="/models" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors w-fit">
        <ArrowLeft size={16} />
        Back to Models
      </Link>
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold gradient-text mb-3">{model.name}</h1>
          {model.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{model.description}</p>
          )}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{model.stars ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Download size={16} />
              <span className="font-medium">{model.downloads ?? 0}</span>
            </div>
            {model.tags && model.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {model.tags.map((tag) => (
                  <Tag key={tag} variant="primary">{tag}</Tag>
                ))}
              </div>
            )}
          </div>
        </div>
        <form action={`${API_BASE}/v1/models/${encodeURIComponent(model.id)}/star`} method="post">
          <Button type="submit" variant="secondary">
            <Star size={16} className="mr-2" />
            Star
          </Button>
        </form>
      </div>

      <Card>
        <CardTitle>Model ID</CardTitle>
        <CardDescription className="mb-3">Use this ID to reference the model in API calls</CardDescription>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
          <code className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">{model.id}</code>
        </div>
      </Card>

      <Card>
        <CardTitle>API Usage Examples</CardTitle>
        <CardDescription className="mb-4">Integrate this model into your application using these code snippets</CardDescription>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CodeSnippet lang="cURL" code={curl} />
          <CodeSnippet lang="JavaScript" code={js} />
          <CodeSnippet lang="Python" code={py} />
        </div>
      </Card>

      {readme && (
        <Card>
          <CardTitle>Documentation</CardTitle>
          <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  );
}


