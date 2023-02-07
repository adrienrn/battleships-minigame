import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./Banner.module.css";

export const Banner: React.FC<{
  children?: ReactNode;
  variant?: BannerVariant;
}> = ({ children, variant = "default" }) => {
  return (
    <div className={clsx(styles["Banner"], styles["Banner--" + variant])}>
      {children}
    </div>
  );
};

export type BannerVariant = "error" | "success" | "default";
