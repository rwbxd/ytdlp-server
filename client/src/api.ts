const API_URL = window.location.protocol + "//" + window.location.host;

export async function listOutput(): Promise<string[]> {
  const response = await fetch(API_URL + "/list_output");
  const jsonResponse = await response.json();
  const filteredResponse = jsonResponse.filter((x: string) => x !== "");
  return filteredResponse as string[];
}

export async function listSubfolders(): Promise<string[]> {
  const response = await fetch(API_URL + "/allowed_subfolders");
  const jsonResponse = await response.json();
  return jsonResponse as string[];
}

export type DownloadRequest = {
  url: string;
  subfolder?: string;
  res?: string;
  format?: string;
};

export async function sendDownloadRequest(
  req: DownloadRequest,
): Promise<boolean> {
  console.log(JSON.stringify(req));
  try {
    const response = await fetch(API_URL + "/download", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch {
    console.log("failed");
    return false;
  }
}

export type ServerOptions = {
  subfolders: string[];
  resolutions: string[];
  formats: string[];
};

export async function getServerOptions(): Promise<ServerOptions> {
  try {
    const response = await fetch(API_URL + "/allowed_options");
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch {
    console.log("failed");
    return { subfolders: [], resolutions: [], formats: [] };
  }
}
