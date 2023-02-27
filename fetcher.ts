interface IJSONFetcher {
    fetchJSON(): string;
  }
  
  export interface IJSONFetcherFactory {
    getJSONFetcher(): IJSONFetcher
  }
  
  export class JSONFetcher implements IJSONFetcher {
    fetchJSON(): string {
        return '{"ac": "ab", "urmom": "fat"}'
    }
  }
  
  export class JSONFetcherFactory implements IJSONFetcherFactory{
    getJSONFetcher(): JSONFetcher {
      return new JSONFetcher()
    }
  }