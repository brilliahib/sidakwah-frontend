import { MaterialContent, MaterialRevisionStatus } from "./material-content";

export interface MaterialContentRevision {
  id: number;
  material_content_id: number;
  version: number;
  sub_modul_id: number;
  title: string;
  youtube_link: string | null;
  article_title: string | null;
  article_content: string | null;
  article_images: string | null;
  sub_modul?: { id: number; title: string } | null;
  status: MaterialRevisionStatus;
  submitted_by: number | null;
  submitted_at: Date | null;
  reviewed_by: number | null;
  reviewed_at: Date | null;
  rejection_reason: string | null;
  submitter?: { id: number; name: string } | null;
  reviewer?: { id: number; name: string } | null;
  material_content?: MaterialContent;
}

export type MaterialDecision = "approved" | "rejected";
