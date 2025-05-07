export default async function fetchGraphQL(query, variables = {}) {
  const res = await fetch('https://wordpress-1203663-5482766.cloudwaysapps.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 } // Opcional: ISR cada 60 segundos
  });
  const json = await res.json();
  return json.data;
} 