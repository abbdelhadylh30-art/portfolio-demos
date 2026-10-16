import { Hero } from "@/components/coolfix/hero";
import { Stats } from "@/components/coolfix/stats";
import { Services } from "@/components/coolfix/services";
import { Steps } from "@/components/coolfix/steps";
import { Plans } from "@/components/coolfix/plans";
import { JobsFeed } from "@/components/coolfix/jobs-feed";
import { ReviewWall } from "@/components/coolfix/review-wall";
import { Coverage } from "@/components/coolfix/coverage";
import { FaqList } from "@/components/coolfix/faq-list";
import { Booking } from "@/components/coolfix/booking";

export default function CoolfixPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Steps />
      <Plans />
      <JobsFeed />
      <ReviewWall />
      <Coverage />
      <FaqList />
      <Booking />
    </>
  );
}
