// src/components/ErrorMessage.jsx
import { memo } from "react";
import { useTranslation } from "react-i18next";

function ErrorMessageBase({ message }) {
  const { t } = useTranslation();
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 15,
        color: "#dc2626",
        padding: "60px 0",
      }}
    >
      {message || t("error")}
    </div>
  );
}

export default memo(ErrorMessageBase);
