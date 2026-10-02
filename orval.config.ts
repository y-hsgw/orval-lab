import { defineConfig } from 'orval';

export default defineConfig({
  jsonPlaceholder: {
    input: {
      target: './openapi/openapi.yaml',
    },
    output: {
      mode: 'split',
      target: './src/generated/api.ts',
      schemas: './src/generated/model',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      indexFiles: true,
      baseUrl: {
        getBaseUrlFromSpecification: true,
      },
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
});
