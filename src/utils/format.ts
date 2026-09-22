export const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (value?: Date | string, type?: "short" | "long") => {
  if (!value) return "-";
  if (value instanceof Date) {
    return value.toLocaleDateString("id-ID", {
      year: "numeric",
      month: type,
      day: "numeric",
    });
  }
  return new Date(value).toLocaleDateString("id-ID", {
    year: "numeric",
    month: type,
    day: "numeric",
  });
};

export const formatDateInput = (value: Date | string) => {
  if (value instanceof Date) {
    return value.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
  });
};
export const formatDateTime = (value: Date | string) => {
  if (value instanceof Date) {
    return value.toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return new Date(value).toLocaleString("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
