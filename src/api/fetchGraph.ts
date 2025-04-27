export async function fetchBlueprintGraph() {
  const response = await fetch('http://localhost:3000/api/v1/123/actions/blueprints/123/graph', {
    headers: {
      'Accept': 'application/json, application/problem+json',
    },
  });
  if (!response.ok) { 
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  console.log(response)
  return response.json();
}