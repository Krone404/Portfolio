export interface Repo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  openGraphImageUrl?: string;
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string;

const query = `
  query GetRepos($login: String!) {
    user(login: $login) {
      repositories(first: 50, orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          id
          name
          description
          url
          openGraphImageUrl
        }
      }
    }
  }
`;

export async function fetchGitHubRepos(username: string): Promise<Repo[]> {
  if (!GITHUB_TOKEN) {
    throw new Error("GitHub token not set in environment variables.");
  }

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: { login: username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed with status ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error("GitHub GraphQL errors:", json.errors);
    throw new Error("GraphQL query returned errors.");
  }

  let repos = json.data.user.repositories.nodes as Repo[];

  const filterRegex = /#featured/i;
  const replaceRegex = /#featured/gi;

  repos = repos.filter(
    (repo) => repo.description && filterRegex.test(repo.description)
  );

  repos = repos.map((repo) => ({
    ...repo,
    description: repo.description
      ? repo.description.replace(replaceRegex, "").trim()
      : repo.description,
  }));

  return repos;
}
