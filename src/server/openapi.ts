import { generateOpenApiDocument } from 'trpc-openapi';

import { appRouter } from './trpc/router/_app';

// // Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Imhotep CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Next.js for Imhotep',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
//   docsUrl: 'https://github.com/jlalmes/trpc-openapi',
  tags: ['auth', 'users', 'posts'],
});