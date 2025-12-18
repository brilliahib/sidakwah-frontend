import { SubModules } from "../sub-modules/sub-modules";

export interface MaterialContent {
  id: number;
  sub_modul_id: number;
  title: string;
  youtube_link?: string;
  article_title?: string;
  article_content?: string;
  article_images?: string;
  sub_modul: SubModules;
  created_at: Date;
  updated_at: Date;
}
