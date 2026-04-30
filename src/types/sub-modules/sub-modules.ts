import { Modules } from "../modules/modules";

export interface SubModules {
  id: number;
  modul_id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  modul: Modules;
}
