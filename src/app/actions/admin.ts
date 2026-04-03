"use server";

export async function verifyPassword(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    return { success: false, error: "ADMIN_PASSWORD not configured on the server." };
  }
  
  if (password === correctPassword) {
    return { success: true };
  }
  
  return { success: false, error: "Incorrect password." };
}

export interface PaperSubmission {
  title: string;
  authors: string;
  abstract: string;
  tags: string;
  contributions: string;
  content: string;
  github?: string;
  pdf?: string;
  password?: string;
}

export async function publishPaper(data: PaperSubmission) {
  // 1. Verify Authentication
  const auth = await verifyPassword(data.password || "");
  if (!auth.success) {
    return { success: false, error: auth.error };
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { success: false, error: "GITHUB_TOKEN not configured on the server." };
  }

  // 2. Validate essential data
  if (!data.title || !data.content || !data.abstract) {
    return { success: false, error: "Title, Abstract, and Content are required." };
  }

  // 3. Format Data
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const date = new Date().toISOString().split('T')[0];
  const authorsArray = data.authors ? data.authors.split(',').map(a => a.trim()).filter(Boolean) : ["Speion Research"];
  const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const contributionsArray = data.contributions ? data.contributions.split('\n').map(c => c.trim()).filter(Boolean) : [];

  // Assemble MDX String
  let mdx = `---
title: "${data.title.replace(/"/g, '\\"')}"
authors: ${JSON.stringify(authorsArray)}
date: "${date}"
version: "v1.0"
abstract: "${data.abstract.replace(/"/g, '\\"')}"
`;

  if (tagsArray.length > 0) {
    mdx += `tags: ${JSON.stringify(tagsArray)}\n`;
  }
  if (contributionsArray.length > 0) {
    mdx += `contributions:\n${contributionsArray.map(c => `  - "${c.replace(/"/g, '\\"')}"`).join('\n')}\n`;
  }
  if (data.github) mdx += `github: "${data.github}"\n`;
  if (data.pdf) mdx += `pdf: "${data.pdf}"\n`;
  mdx += `status: "published"\n---\n\n${data.content}`;

  // 4. Push to GitHub
  const REPO = 'FGARMY/SpeionResearch';
  const PATH = `src/content/papers/${slug}.mdx`;
  const b64 = Buffer.from(mdx).toString('base64');

  try {
    // Check if paper already exists
    const checkRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (checkRes.ok) {
      return { success: false, error: "A paper with this generated slug already exists. Please modify the title slightly." };
    }

    // Push new file
    const pushRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: publish new paper "${data.title}" via Admin Portal`,
        content: b64,
      }),
    });

    if (!pushRes.ok) {
      const errorData = await pushRes.json();
      console.error("GitHub API Error: ", errorData);
      return { success: false, error: `GitHub push failed: ${errorData.message || pushRes.statusText}` };
    }

    return { success: true, slug };
  } catch (error: any) {
    console.error("Publish Error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
