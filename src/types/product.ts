export type VariationProp = {
  id: string;
  name: string;            
  variation_id: string;
  value?: string;         
};

export type Variation = {
  id: string;
  name: string;          
  product_id: string;
  type: "image" | "button";
  props: VariationProp[];
};

export type VariantProp = {
  id: string;
  variation: string;      
  variation_prop: string; 
  product_variant_id: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  price: number;
  sale_price: number;
  quantity: number;
  taager_code: string;
  variation_props: VariantProp[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  thumb?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number;
  description: string;  
  thumb: string;
  images: string[];
  variations: Variation[];
  variants: ProductVariant[];
  categories: Category[];
};
