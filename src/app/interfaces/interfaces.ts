export interface RespuestaTopHeadlines {
    status: string;
    totalResults: number;
    articles: Article[];
  }
  
  export interface Article {
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }
  
  export interface Source {
    id: string;
    name: string;
  }

  export interface Notas {
    titulo: string;
    fecha: Date;
    texto: string;
  }