export const ENDPOINTS = {
  // What We Do
  WHATWEDO: '/api/whatwedo',

  // What We Do Detail
  WHATWEDODETAIL_BY_WHATWEDO_ID: (whatwedo_id: number) => `/whatwedodetail/whatwedo/${whatwedo_id}`,

  // Technologies
  TECHNOLOGIES: '/api/technologies',
};
