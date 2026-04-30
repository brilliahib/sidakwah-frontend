import { MaterialContent } from "../material-contents/material-content";
import { User } from "../user/user";

export interface Comment {
  id: number;
  material_content_id: number;
  user_id: number;
  parent_id: number | null;
  user: User;
  content: string;
  replies?: Comment[];
  created_at: Date;
  updated_at: Date;
  material_content?: MaterialContent;
}
