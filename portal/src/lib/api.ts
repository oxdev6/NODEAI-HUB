export const API_BASE = process.env.NEXT_PUBLIC_NODEAI_API || "http://localhost:3001";

export async function getJSON<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { 
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`GET ${path} failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`API Error GET ${path}:`, error);
    throw error;
  }
}

export async function postJSON<T>(path: string, body: any): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`POST ${path} failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`API Error POST ${path}:`, error);
    throw error;
  }
}


