import { defineType, defineField } from "sanity";

export default defineType({
  name: "visionMissionSection",
  title: "Vision, Mission & Values Block",
  type: "object",
  fields: [
    defineField({
      name: "cards",
      title: "Content Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "vmvCard",
          title: "Card Item",
          fields: [
            {
              name: "cardId",
              title: "Card ID Key (e.g., vision, mission, values)",
              type: "string",
            },
            {
              name: "label",
              title: "Badge Label (e.g., VISION)",
              type: "string",
            },
            { name: "subtitle", title: "Optional Subtitle", type: "string" },
            { name: "text", title: "Description Text", type: "text" },
            {
              name: "wide",
              title: "Is Full Width Card?",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
      initialValue: [
        {
          cardId: "vision",
          label: "VISION",
          text: "A dedicated construction industry law firm who helps individuals and businesses in Ontario receive the quality of work that they expect and collect payment for good work performed.",
          wide: false,
        },
        {
          cardId: "mission",
          label: "MISSION",
          text: "To provide our clients with affordable and creative solutions tailored to their individual legal and business needs.",
          wide: false,
        },
        {
          cardId: "values",
          label: "VALUES",
          subtitle: "Cost-efficiency, Creativity, and Confidence",
          text: "Our core values include cost-efficiency, creativity, and confidence:\nWe understand that litigation, with its complexities and unknowns, might become a major source of stress in the lives of many clients. As such, we hope to inspire confidence in our clients to rest easy and trust that the FPC has their cases under control.",
          wide: true,
        },
      ],
    }),
  ],
});
