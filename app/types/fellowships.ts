export interface BaseFellowship {
  id: number;
  name: string;
  batch: string;
  date_announced: string;
  description: string | null;
  embedding_description: number[];
}

export interface EVWinner extends BaseFellowship {
  link: string | null;
  type: string | null;
  career_stage: string | null;
  personal_links: string[] | null;
  personal_info: string | null;
  mr_posts: string[] | null;
  project_links: string[] | null;
}

export interface ThielFellow extends BaseFellowship {
  school: string | null;
  graduation_year: string | null;
  project_area: string | null;
  company_name: string | null;
  funding_raised: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ZFellow extends BaseFellowship {
  tech_stack: string[] | null;
  github: string | null;
  startup_idea: string | null;
  linkedin: string | null;
  twitter: string | null;
  personal_website: string | null;
}

export interface YCFounder extends BaseFellowship {
  company_name: string;
  batch_season: 'W' | 'S';
  batch_year: number;
  company_url: string | null;
  industry: string | null;
  funding_raised: string | null;
  status: 'Active' | 'Acquired' | 'Defunct' | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface NeoScholar extends BaseFellowship {
  school: string;
  description: string;
}

export interface STSScholar extends BaseFellowship {
  school: string;
  project_title: string;
}

export interface KPFellow extends BaseFellowship {
  school: string;
  role: string;
  company: string;
}

export interface CameronScholar extends BaseFellowship {
  school: string;
  impact_area: string;
  project_description: string;
}

export interface RiseScholar extends BaseFellowship {
  school: string;
  country: string;
  project_area: string;
}

export type FellowshipData = {
  ev: EVWinner[];
  thiel: ThielFellow[];
  zFellows: ZFellow[];
  neo: NeoScholar[];
  sts: STSScholar[];
  kp: KPFellow[];
  cameron: CameronScholar[];
  rise: RiseScholar[];
}; 