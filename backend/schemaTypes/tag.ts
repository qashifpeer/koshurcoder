// schemas/tag.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(2).max(50),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "icon",
      title: "Icon (optional)",
      type: "string",
      description: "Short text identifier for an icon (e.g., 'nextjs', 'sanity', 'trading')",
    }),
  ],

  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare(selection) {
      const { title, slug } = selection;
      return {
        title,
        subtitle: slug ? `/${slug}` : "no slug",
      };
    },
  },
});