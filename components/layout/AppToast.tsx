import { Fragment, ReactNode } from "react";
import { StatusBar, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { create } from "zustand";
import { TText } from "../themed";
import ActionToast from "../toast/ActionSuccessToast";

const uuidv4 = () => {
  return Date.now().toString() + Math.floor(Math.random() * 999);
};

// Toast Types
export type AppToastMessage = {
  id: string;
  message: string;
  duration?: number;
  variant?: "success" | "error" | "warning" | "info" | "default";
};

export type AppToastComponent = {
  id: string;
  comp: ReactNode;
  duration?: number;
};

// Zustand Store
export type AppToastState = {
  messages: AppToastMessage[];
  components: AppToastComponent[];
  addMessage: (msg: Omit<AppToastMessage, "id">) => void;
  addComponent: (comp: AppToastComponent) => void;
  removeMessage: (id: string) => void;
  removeComponent: (id: string) => void;
};

export const useAppToastStore = create<AppToastState>((set) => ({
  messages: [],
  components: [],
  addMessage: (msg) => {
    const id = uuidv4();
    const newMsg = { id, ...msg };
    set((s) => ({ messages: [...s.messages, newMsg] }));
    setTimeout(() => {
      set((s) => ({ messages: s.messages.filter((m) => m.id !== id) }));
    }, msg.duration ?? 4500);
  },
  removeMessage: (id) =>
    set((s) => ({ messages: s.messages.filter((m) => m.id !== id) })),
  addComponent: (comp) => {
    set((s) => ({ components: [...s.components, comp] }));
    setTimeout(() => {
      set((s) => ({
        components: s.components.filter((c) => c.id !== comp.id),
      }));
    }, comp.duration ?? 4500);
  },
  removeComponent: (id) =>
    set((s) => ({ components: s.components.filter((c) => c.id !== id) })),
}));

// Toast Renderer
export function AppToastProvider() {
  const { messages, components } = useAppToastStore();

  return (
    <>
      {[
        ...messages.map((msg) => (
          <Animated.View
            key={msg.id}
            entering={FadeInUp.duration(300).springify()}
            exiting={FadeOutUp.duration(300).springify()}
            className={`${getBgFromVariant(
              msg.variant
            )} absolute top-0 z-100 mx-auto mt-2 min-w-[120] max-w-[320] self-center overflow-hidden rounded-2xl`}
            style={{
              marginTop: (StatusBar.currentHeight ?? 18) + 20,
              // iOS shadow
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              // Android shadow
              elevation: 5,
            }}
          >
            <View>
              <TText variant="shade100" className="p-2 text-center text-base">
                {msg.message}
              </TText>
            </View>
          </Animated.View>
        )),
        ...components.map(
          (comp) => (
            // <Animated.View
            //   key={comp.id}
            //   entering={FadeInUp.duration(300).springify()}
            //   exiting={FadeOutUp.duration(300).springify()}
            //   className="mt-2 mx-auto">
            <Fragment key={comp.id}>{comp.comp}</Fragment>
          )
          // </Animated.View>
        ),
      ]}
    </>
  );
}

function getBgFromVariant(variant: AppToastMessage["variant"]) {
  switch (variant) {
    case "success":
      return "bg-green-200 dark:bg-green-800";
    case "error":
      return "bg-red-200 dark:bg-red-800";
    case "warning":
      return "bg-yellow-200 dark:bg-yellow-800";
    case "info":
      return "bg-blue-200 dark:bg-blue-800";
    default:
      return "bg-neutral-200 dark:bg-neutral-800";
  }
}

export const AppToast = {
  default(message: string | Omit<AppToastMessage, "id">) {
    const add = useAppToastStore.getState().addMessage;
    add(typeof message === "string" ? { message } : message);
  },
  error(message: string) {
    const add = useAppToastStore.getState().addComponent;
    add({
      comp: <ActionToast title={message} variant="error" />,
      id: uuidv4(),
    });
  },
  success(message: string) {
    const add = useAppToastStore.getState().addComponent;
    add({
      comp: <ActionToast title={message} variant="success" />,
      id: uuidv4(),
    });
  },
  custom(comp: Omit<AppToastComponent, "id">) {
    const add = useAppToastStore.getState().addComponent;
    add({
      ...comp,
      id: uuidv4(),
    });
  },
  actionSuccess(msg: string) {
    const add = useAppToastStore.getState().addComponent;
    add({
      comp: <ActionToast title={msg} variant="success" />,
      id: uuidv4(),
    });
  },
};
