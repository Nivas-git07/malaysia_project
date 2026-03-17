import React from "react";

export default function DateOnly({ value }) {
  if (!value) return null;

  const formattedDate = new Date(value).toISOString().split("T")[0];

  return <span>{formattedDate}</span>;
}