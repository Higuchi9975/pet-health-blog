import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    publishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
      (value) => !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value,
      '日付は実在する日を YYYY-MM-DD 形式で入力してください。',
    ),
    description: z.string().optional(),
    category: z.string().default('ペットの健康'),
    titleLines: z.array(z.string().min(1)).min(1).optional(),
    breadcrumbTitle: z.string().optional(),
    subtitle: z.string().optional(),
    image: z.object({
      src: z.string().startsWith('/images/'),
      alt: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
