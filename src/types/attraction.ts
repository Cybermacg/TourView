export interface PlaceProperties {
  name?: string;
  country?: string;
  country_code?: string;
  state?: string;
  county?: string;
  province?: string;
  city?: string;
  postcode?: string;
  suburb?: string;
  street?: string;
  district?: string;
  neighbourhood?: string;
  formatted?: string;
  address_line1?: string;
  address_line2?: string;
  categories?: string[];
  details?: string[];
  place_id?: string;
  lon?: number;
  lat?: number;
  distance?: number;
  datasource?: {
    sourcename?: string;
    attribution?: string;
    license?: string;
    url?: string;
    raw?: Record<string, unknown>;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  opening_hours?: string;
  wiki_and_media?: {
    wikipedia?: string;
    wikidata?: string;
  };
}

export interface PlaceGeometry {
  type: string;
  coordinates: [number, number];
}

export interface AttractionFeature {
  type: 'Feature';
  properties: PlaceProperties;
  geometry: PlaceGeometry;
}

export interface AttractionResponse {
  type: 'FeatureCollection';
  features: AttractionFeature[];
}
