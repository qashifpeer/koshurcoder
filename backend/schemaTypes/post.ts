import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  type: "document",
  title: "Post",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      // <-- no ": Rule" here
      validation: (rule) =>
        rule.required().min(5).max(120).warning("Keep titles between 5–120 characters"),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("Slug is required"),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required().error("Author is required"),
    }),

    defineField({
      name: "featureImage",
      title: "Feature Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) =>
            rule.required().error("Alt text is required for accessibility"),
        }),
      ],
      validation: (rule) =>
        rule.required().error("Feature image is required"),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (rule) =>
        rule.min(1).warning("Add at least one Tag to help organize content"),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .min(30)
          .max(260)
          .error("Short description should be 30–260 characters (used as meta description)"),
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error("Publish date is required"),
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (rule) =>
        rule.required().min(1).error("Body content is required"),
    }),

    defineField({
      name: "isFeatured",
      title: "Featured post",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "readingTime",
      title: "Estimated reading time (minutes)",
      type: "number",
      validation: (rule) =>
        rule.min(1).max(60).warning("Reading time should be between 1 and 60 minutes"),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Optional custom title for meta tags and social sharing.",
      validation: (rule) => rule.max(60).warning("Try to keep SEO titles under 60 characters"),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Optional custom description for meta tags.",
      validation: (rule) =>
        rule.max(160).warning("Meta descriptions usually work best under 160 characters"),
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featureImage",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, author, media, publishedAt } = selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "Draft";
      return {
        title,
        media,
        subtitle: `${author ? `by ${author} • ` : ""}${date}`,
      };
    },
  },
});