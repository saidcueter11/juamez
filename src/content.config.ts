import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/data/products' }),
	schema: z.object({
		locale: z.enum(['es', 'en']),
		name: z.string(),
		slug: z.string(),
		category: z.string(),
		summary: z.string(),
		origin: z.string(),
		image: z.string(),
		badge: z.string(),
		featured: z.boolean().default(false),
		order: z.number().default(0),
	}),
});

export const collections = {
	products,
};
