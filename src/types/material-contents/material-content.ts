import { SubModules } from "../sub-modules/sub-modules";

export const MATERIAL_REVISION_STATUSES = [
  "draft",
  "pending",
  "approved",
  "rejected",
  "superseded",
] as const;

export type MaterialRevisionStatus = (typeof MATERIAL_REVISION_STATUSES)[number];
export type MaterialSubmissionAction = "save_draft" | "submit";

export interface MaterialContent {
  id: number;
  sub_modul_id: number | null;
  title: string | null;
  youtube_link?: string;
  article_title?: string;
  article_content?: string;
  article_images?: string;
  sub_modul: SubModules | null;
  published_at?: Date | null;
  management_status?: MaterialRevisionStatus;
  has_published_version?: boolean;
  latest_revision?: {
    id: number;
    version: number;
    status: MaterialRevisionStatus;
    sub_modul_id?: number;
    title?: string;
    youtube_link?: string | null;
    article_content?: string | null;
    article_title?: string | null;
    rejection_reason: string | null;
    submitted_at: Date | null;
    article_images: string | null;
    sub_modul?: SubModules | null;
  } | null;
  revisions?: Array<{
    id: number;
    version: number;
    status: MaterialRevisionStatus;
    title: string;
    sub_modul_id: number;
    sub_modul?: SubModules | null;
    youtube_link: string | null;
    article_title: string | null;
    article_content: string | null;
    article_images: string | null;
    submitted_at: Date | null;
    reviewed_at: Date | null;
    rejection_reason: string | null;
    submitter?: { id: number; name: string } | null;
    reviewer?: { id: number; name: string } | null;
  }>;
  created_at: Date;
  updated_at: Date;
}
