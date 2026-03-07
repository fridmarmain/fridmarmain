import { defineType, defineArrayMember, defineField } from "sanity";

export default defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "row",
          title: "Row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }) {
              return {
                title: cells?.join(" | ") || "Empty row",
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare({ rows }) {
      return {
        title: `Table — ${rows?.length ?? 0} row(s)`,
      };
    },
  },
});
