import AdRow from "@/components/common/AdRow";
import { HomeBottomNavSpace } from "@/components/home/HomeBottomNav";
import HomeQuickPayRow from "@/components/home/HomeQuickPayRow";
import HomeRecentTransactions from "@/components/home/HomeRecentTransactions";
import HomeScaffold from "@/components/home/HomeScaffold";
import HomeTopBar from "@/components/home/HomeTopBar";
import HomeTopView from "@/components/home/HomeTopView";

export default function Index() {
  return (
    <HomeScaffold heading={<HomeTopBar />} topContent={<HomeTopView />}>
      <HomeQuickPayRow />
      <AdRow />
      <HomeRecentTransactions />
      <HomeBottomNavSpace />
    </HomeScaffold>
  );
}
