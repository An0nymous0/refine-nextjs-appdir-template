import {NotificationProvider} from "@refinedev/core";
import {toast} from "@/components/ui/use-toast"

export const notificationProvider: NotificationProvider = {

    open: ({ key , message, type }) => {
        switch (type) {
            case "success":
                toast({
                    description: message,
                })
                break;
            case "error":
                toast({
                    description: message,
                    variant: "destructive",
                })
            default:
                break;
        }
    },

    close: (key: any) => {
        toast({}).dismiss();
    },
};