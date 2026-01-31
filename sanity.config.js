import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes"; // Updated path to your new location
import { iconPicker } from "sanity-plugin-icon-picker";
import { structure } from "./src/sanity/deskStructure"; // Updated path
import { muxInput } from "sanity-plugin-mux-input";

export default defineConfig({
  name: "default",
  title: "Fridmar Law CMS",

  projectId: "regpiees",
  dataset: "production",

  // 1. ADD THIS LINE: This tells Sanity it is being served at /admin
  basePath: "/admin",

  plugins: [
    structureTool({
      structure: structure,
    }),
    visionTool(),
    iconPicker(),
    muxInput(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: "practiceArea-child",
        title: "Practice Area Child",
        schemaType: "practiceArea",
        parameters: [{ name: "parentId", type: "string" }],
        value: (params) => ({
          parentArea: { _type: "reference", _ref: params.parentId },
          level: "service",
        }),
      },
    ],
  },
});
