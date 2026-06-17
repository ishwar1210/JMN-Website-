export const ENDPOINTS = {
  // What We Do
  WHATWEDO: '/whatwedo',
  WHATWEDO_BY_CATEGORY: (category: string) => `/whatwedo/category/${category}`,
  WHATWEDO_BY_SLUG: (slug: string) => `/whatwedo/${slug}`,
  WHATWEDO_BY_ID: (id: number) => `/whatwedo/${id}`,

  // Technologies
  TECHNOLOGIES: '/technologies',
  TECHNOLOGIES_BY_SLUG: (slug: string) => `/technologies/${slug}`,
  TECHNOLOGIES_BY_ID: (id: number) => `/technologies/${id}`,
};
