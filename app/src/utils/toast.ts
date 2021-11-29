import { default as reactHotToast } from "react-hot-toast";

export type TToast = "success" | "warning" | "error";

export const toast = (
  text: string,
  toastType: TToast = "success",
  duration: number = 2000
) => {
  let primary, secondary, icon;
  switch (toastType) {
    case "success":
      primary = "#19a85b";
      secondary = "#ffffff";
      icon = "✓";
      break;
    case "warning":
      primary = "#c22330";
      secondary = "#f9dc2b";
      icon = "⚠";
      break;
    case "error":
      primary = "#ffffff";
      secondary = "#c22330";
      icon = "❌";
      break;
    default:
      primary = "#000000";
      secondary = "#ffffff";
      icon = "👏";
  }
  const style = {
    border: `1px solid ${primary}`,
    padding: "16px",
    background: `${secondary}`,
    color: `${primary}`,
  };

  reactHotToast(text, {
    duration,
    position: "top-center",
    // Styling
    style,
    className: "",
    icon,
    // Custom Icon
    // Change colors of success/error/loading icon
    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};
