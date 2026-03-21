// sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./backend/schemaTypes"; // point to your schema folder
import type { SchemaTypeDefinition } from "sanity";

export default defineConfig({
  name: "koshurcoder-blog",
  title: "KoshurCoder Studio",
  projectId: "xixdrqyb",
  dataset: "production", // or your dataset name
  basePath: "/studio",   // makes Studio live at /studio
  plugins: [deskTool()],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
});