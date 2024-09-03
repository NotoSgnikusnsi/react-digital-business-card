import { createClient } from "@supabase/supabase-js";
import { Record } from "../types/Record.ts";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchRecords = async () => {
  try {
    const { data, error } = await supabase.from("study_record").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    alert("データの取得に失敗しました");
    return [];
  }
};

export const insertRecord = async (record: Record) => {
  try {
    const { data, error } = await supabase
      .from("study_record")
      .insert([record])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    alert("データの記録に失敗しました");
    return [];
  }
};

export const deleteRecord = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("study_record")
      .delete()
      .eq("id", id)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    alert("データの削除に失敗しました");
    return [];
  }
};
