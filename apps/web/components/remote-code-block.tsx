import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface RemoteCodeBlockProps {
  url: string;
}

function parseGitHubUrl(url: string): string {
  try {
    // Split the URL to separate the line reference part
    const [githubUrl, loc] = url.split("#");

    // Store loc for future use (not implementing line range handling yet)
    // const lineRange = loc; // We'll use this in future

    // Parse the GitHub URL to create raw URL
    if (!githubUrl) {
      throw new Error("Invalid GitHub URL");
    }

    const urlObj = new URL(githubUrl);
    const pathParts = urlObj.pathname.split("/").slice(1);

    if (pathParts.length < 5) {
      throw new Error("Invalid GitHub repository path");
    }

    const [org, repo, blob, branch, ...pathSeg] = pathParts;

    if (!org || !repo || !branch || pathSeg.length === 0) {
      throw new Error("Missing required GitHub path components");
    }

    // Convert to raw URL
    return `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join("/")}`;
  } catch (error) {
    console.error("Error parsing GitHub URL:", error);
    return url; // Return original URL if parsing fails
  }
}

async function fetchCode(url: string) {
  try {
    const response = await fetch(url, { cache: "force-cache" });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch code: ${response.status} ${response.statusText}`
      );
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching code:", error);
    return `// Error fetching code: ${error instanceof Error ? error.message : String(error)}`;
  }
}

function getLanguageFromUrl(url: string): string {
  try {
    const extension = url.split(".").pop()?.toLowerCase() || "";
    return extension;
  } catch {
    return "";
  }
}

export default async function RemoteCodeBlock({ url }: RemoteCodeBlockProps) {
  try {
    let fetchUrl = url;

    // Convert GitHub URLs to raw URLs
    if (url.includes("github.com")) {
      fetchUrl = parseGitHubUrl(url);
    }

    const code = await fetchCode(fetchUrl);
    const lang = getLanguageFromUrl(fetchUrl);

    return <DynamicCodeBlock lang={lang} code={code} />;
  } catch (error) {
    console.error("Error in RemoteCodeBlock:", error);
    return (
      <DynamicCodeBlock
        lang="text"
        code={`// Error: ${error instanceof Error ? error.message : String(error)}`}
      />
    );
  }
}
