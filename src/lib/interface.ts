interface Author {
    _id: string;
    name: string;
    slug: string;
    image: any;
  }
  
  interface Category {
    _id: string;
    name: string;
    slug : {current: string}
  }

  interface Place {
    _id: string;
    name: string;
    slug : {current: string}
  }

  
  interface Post {
    _id: string;
    title: string;
    shortDescription: string;
    slug: {current: string};
    imageUrl: string;
    altFtImg: string;
    publishedAt: string;
    body: string;
    author: Author;
    categories: Category[];
    // place: Place[];
    content: any;
  }

  interface FetchedData {
    _id: string;
    title: string;
    shortDescription: string;
    slug: string;
    imageUrl: string;
    altFtImg: string;
    publishedAt: string;
    body: string;
    author: Author;
    categories: Category[];
    // place: Place[];
    content: any;
  }

  interface PostType {
    _id: string;
    title: string;
    shortDescription: string;
    slug: string;
    imageUrl: string;
    altFtImg: string;
    publishedAt: string;
    body: string;
    author: Author;
    categories: Category[];
    // place: Place[];
    content: any;

  }
  
  
  