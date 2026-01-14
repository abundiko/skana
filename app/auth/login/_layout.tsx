import AppStack from "@/components/layout/AppStack";

export default function _layout() {
  return (
    <AppStack
      screens={["index", "saved-login", "fresh-login", "fresh-login-verify"]}
    />
  );
}
