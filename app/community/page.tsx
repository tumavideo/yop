import CTA from "@/components/CTA";
import YTEmbed from "@/components/YTEmbed";
import { testimonials } from "@/constants";

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
          title="Get Approved"
          company={false}
          description="Browse through a list of services"
        />
      </div>
    </div>
  );
}
