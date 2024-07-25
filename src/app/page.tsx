"use client";

import { CalculationResult } from "@/components/CalculationResult";
import { Content } from "@/components/Content";
import { DolarView } from "@/components/DolarView";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Content>
      <Header>
        <Link href="/settings">
          <Button>Settings</Button>
        </Link>
      </Header>
      <section className="flex-1 flex items-center justify-center flex-col space-y-10">
        <CalculationResult />

        {/* <div className="min-w-96 flex items-center justify-between">
          <Button variant="outline">Details</Button>
        </div> */}

        <DolarView />
      </section>
    </Content>
  );
}
