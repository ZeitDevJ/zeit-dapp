import { toast } from "sonner";
import {
  ToastDanger,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from "@/reusable components/widgets/notifications";

const toastInvoker = (type) => {
  switch (type) {
    case "success":
      toast.custom((t) => <ToastSuccess toast={toast} t={t} />);
      break;
    case "warning":
      toast.custom((t) => <ToastWarning toast={toast} t={t} />);
      break;
    case "danger":
      toast.custom((t) => <ToastDanger toast={toast} t={t} />);
      break;
    case "info":
      toast.custom((t) => <ToastInfo toast={toast} t={t} />);
      break;
  }
};

export default toastInvoker;
