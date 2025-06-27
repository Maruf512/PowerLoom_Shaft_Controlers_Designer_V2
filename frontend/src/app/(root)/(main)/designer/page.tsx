"use client";

import DesignerEditor from "@/components/layout/DesignerEditor";
import { useToast } from "@/components/ui/ToastProvider";
import { designerEnitialState } from "@/constants/Designer";
import apiClient from "@/lib/apiClient";
import { DesignType } from "@/types/data";
import React from "react";

const page = () => {
  const toast = useToast();
  const createHandler = async (designerData: DesignType) => {
    const { data, error, status } = await apiClient(`designs`, {
      method: "POST",
      body: designerData,
    });

    if (error) {
      toast("Error creating designer data", "error");
      return;
    }
    toast("Designer data created successfully", "success");
  };

  return (
    <div>
      <DesignerEditor
        designerState={designerEnitialState}
        handler={createHandler}
        title={"Save"}
      />
    </div>
  );
};

export default page;
