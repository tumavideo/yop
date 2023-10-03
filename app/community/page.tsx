import YTEmbed from "@/components/YTEmbed";
import { testimonials } from "@/constants";
import CTA from "@/components/CTA";

export default async function Community() {
  return (
    <div className="bg-white">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <YTEmbed testimonials={testimonials} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl pb-0 md:pb-32">
        <CTA
            title="Get Loan today"
            company={false}
            description="It’s time to showcase your opportunity. Start posting the  right opportunities to empower a brighter future."
        />
      </div>
    </div>
  );
}
