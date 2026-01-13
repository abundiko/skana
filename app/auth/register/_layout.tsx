import AppStack from "@/components/layout/AppStack";

export default function _layout() {
  return (
    <>
    <AppStack screens={["index", "phone", "phone-verify", "create-pin", "details", "verify"]} />
    </>
  )
}