import AppStack from "@/components/layout/AppStack";

export default function _layout() {
  return (
    <AppStack noAnimation screens={["index", "second", "third"]} />
  )
}