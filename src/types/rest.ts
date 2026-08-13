export interface CountryTourismInfo {
  names: {
    common: string;
    official: string;
    native?: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
    alternates?: string[];
    translations?: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  capitals?: {
    name: string;
    primary?: boolean;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }[];
  region: string;
  subregion?: string;
  continents: string[];
  population: number;
  area: {
    kilometers: number;
    miles: number;
  };
  languages?: {
    name: string;
    bcp47?: string;
  }[];
  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];
  timezones: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  borders?: string[];
  flag: {
    emoji?: string;
    colors?: Record<string, unknown>;
    description?: string;
    url_svg?: string;
    url_png?: string;
  };
  links: {
    google_maps?: string;
    open_street_maps?: string;
    official?: string;
  };
  demonyms?: {
    eng?: {
      f: string;
      m: string;
    };
    fra?: {
      f: string;
      m: string;
    };
  };
  codes?: {
    alpha_2: string;
    alpha_3: string;
    ccn3: string;
    cioc?: string;
    fifa?: string;
  };
  calling_codes?: string[];
  government_type?: string;
  landlocked?: boolean;
  tlds?: string[];
  uuid: string;
}