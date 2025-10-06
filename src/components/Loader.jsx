// src/components/Loader.jsx
import { memo } from "react";
import { useTranslation } from "react-i18next";

function LoaderBase() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 15,
        padding: "60px 0",
        color: "#737373",
      }}
    >
      {t("loading")}
    </div>
  );
}

export default memo(LoaderBase);
