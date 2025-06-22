

export interface Ad {
  id: string;
  text: string;
  image: string;
  premium: boolean;
  creditsRequired?: number;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  requiresCredits?: number;
  contactCredits?: number;
}

export interface Subcategory {
  id: number;
  name: string;
  ads: Ad[];
  products: Product[];
}

export interface Category {
  id: number;
  name: string;
  ads: Ad[];
  subcategories: Subcategory[];
}

