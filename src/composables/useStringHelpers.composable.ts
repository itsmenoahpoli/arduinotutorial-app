import { format, parseISO } from "date-fns";

export const useStringHelpers = () => {
  const formatDate = (value: string, dateFormat: string = "MMMM d, yyyy") => {
    return format(parseISO(value), dateFormat);
  };

  return {
    formatDate,
  };
};
