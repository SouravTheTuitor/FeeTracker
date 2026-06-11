"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TestAuth() {
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);
    }

    checkUser();
  }, []);

  return <div className="p-4">Check Console</div>;
}