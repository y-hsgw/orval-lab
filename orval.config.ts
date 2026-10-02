import { defineConfig } from 'orval';

export default defineConfig({
  jsonPlaceholder: {
    input: {
      target: './openapi/openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/endpoints.ts',
      schemas: './src/generated/model',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      indexFiles: true,
      tagsSplitDeduplication: true,
      baseUrl: {
        getBaseUrlFromSpecification: true,
      },
    },
  },
});
