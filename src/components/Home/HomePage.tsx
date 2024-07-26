import { CalculationResult } from "@/components/Home/CalculationResult";
import { DollarView } from "@/components/Home/DollarView";
import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HomePage = () => {
  return (
    <Content>
      <Header>
        <Link href="/settings">
          <Button>Settings</Button>
        </Link>
      </Header>
      <section className="flex-1 flex items-center justify-center flex-col space-y-10">
        <CalculationResult role="calculation-result" />
        <DollarView role="dolar-view" />
      </section>
    </Content>
  );
};
