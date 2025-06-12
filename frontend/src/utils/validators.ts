import { AuthFieldsNameType, AuthFieldsTypes } from "@/types/auth";
import { DesignErrorType, DesignType } from "@/types/data";

export const authFormValidator = (
  formData: Record<AuthFieldsNameType, string>
) => {
  const newErrors = {} as Record<AuthFieldsNameType, string>;

  if (formData.email.trim() === "") {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (formData.password === "") {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (formData.username === "") {
    newErrors.username = "Username is required";
  }

  return newErrors;
};

export const designDataValidator = (
  designData: DesignType,
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>
) => {
  let errors: DesignErrorType = {
    name: "",
    total_color_palettes: "",
    color_box_1: "",
    color_box_2: "",
    color_box_3: "",
    color_box_4: "",
    starting_position: "",
    machine_type: "",
    design_grids: new Array(designData.design_grids.length).fill({
      color_box: "",
      total_pics: "",
    }),
  };

  let isValid = true;

  if (
    designData.name === "" ||
    designData.name === null ||
    designData.name === undefined
  ) {
    errors.name = "Name is Required";
    isValid = false;
  }

  if (
    designData.total_color_palettes === null ||
    designData.total_color_palettes === undefined
  ) {
    errors.total_color_palettes = "Total Color Palettes is Required";
    isValid = false;
  }

  if (
    designData.color_box_1 === "" ||
    designData.color_box_1 === null ||
    designData.color_box_1 === undefined
  ) {
    errors.color_box_1 = "Color Box 1 is Required";
    isValid = false;
  }

  if (
    designData.color_box_2 === "" ||
    designData.color_box_2 === null ||
    designData.color_box_2 === undefined
  ) {
    errors.color_box_2 = "Color Box 2 is Required";
    isValid = false;
  }

  if (
    designData.color_box_3 === "" ||
    designData.color_box_3 === null ||
    designData.color_box_3 === undefined
  ) {
    errors.color_box_3 = "Color Box 3 is Required";
    isValid = false;
  }

  if (
    designData.color_box_4 === "" ||
    designData.color_box_4 === null ||
    designData.color_box_4 === undefined
  ) {
    errors.color_box_4 = "Color Box 4 is Required";
    isValid = false;
  }

  designData.design_grids.forEach((item, i) => {
    if (item.color_box === null || item.color_box === undefined) {
      errors.design_grids[i].color_box = "Color Box is Required";
      isValid = false;
    }

    if (item.total_pics === null || item.total_pics === undefined) {
      errors.design_grids[i].total_pics = "Total Pics is Required";
      isValid = false;
    }
  });
};
