import { toast } from "sonner";
import {
  ToastDanger,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from "@/reusable components/widgets/notifications";

const toastInvoker = (type, title, content) => {
  switch (type) {
    case "success":
      toast.custom((t) => (
        <ToastSuccess title={title} content={content} toast={toast} t={t} />
      ));
      break;
    case "warning":
      toast.custom((t) => (
        <ToastWarning title={title} content={content} toast={toast} t={t} />
      ));
      break;
    case "danger":
      toast.custom((t) => (
        <ToastDanger title={title} content={content} toast={toast} t={t} />
      ));
      break;
    case "info":
      toast.custom((t) => (
        <ToastInfo title={title} content={content} toast={toast} t={t} />
      ));
      break;
  }
};

export default toastInvoker;
