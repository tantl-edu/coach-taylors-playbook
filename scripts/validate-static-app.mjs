import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { execFileSync } from "node:child_process";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "app-config.js",
  "app-data.js",
  "pwa.js",
  "sw.js",
  "manifest.webmanifest",
  "latin-logo.png",
  "court-background.png",
  "favicon.png",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png"
];

async function assertFile(path) {
  try {
    await access(path, constants.R_OK);
  } catch {
    throw new Error(`Missing required file: ${path}`);
  }
}

for (const file of requiredFiles) {
  await assertFile(file);
}

for (const file of ["app.js", "app-config.js", "app-data.js", "pwa.js", "sw.js"]) {
  execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
}

const manifestText = await readFile("manifest.webmanifest", "utf8");
let manifest;
try {
  manifest = JSON.parse(manifestText);
} catch (error) {
  throw new Error(`manifest.webmanifest is not valid JSON: ${error.message}`);
}

for (const field of ["name", "short_name", "start_url", "scope", "display", "icons"]) {
  if (!manifest[field]) {
    throw new Error(`manifest.webmanifest is missing required field: ${field}`);
  }
}

if (!Array.isArray(manifest.icons) || manifest.icons.length < 2) {
  throw new Error("manifest.webmanifest should include at least the 192px and 512px icons.");
}

for (const icon of manifest.icons) {
  if (!icon.src || !icon.sizes || !icon.type) {
    throw new Error("Each manifest icon must include src, sizes, and type.");
  }
  await assertFile(icon.src.replace(/^\.\//, ""));
}

const indexHtml = await readFile("index.html", "utf8");
for (const reference of [
  "styles.css",
  "app.js",
  "pwa.js",
  "manifest.webmanifest",
  "latin-logo.png",
  "apple-touch-icon.png"
]) {
  if (!indexHtml.includes(reference)) {
    throw new Error(`index.html does not reference ${reference}`);
  }
}

const serviceWorker = await readFile("sw.js", "utf8");
for (const cachedAsset of requiredFiles.filter(file => file !== "sw.js")) {
  if (!serviceWorker.includes(`./${cachedAsset}`)) {
    throw new Error(`sw.js cache list does not include ./${cachedAsset}`);
  }
}

console.log("Static app validation passed.");
