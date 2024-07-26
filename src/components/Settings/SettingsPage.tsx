import { SettingsForm } from "@/components/Settings/SettingsForm";
import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <Content>
      <Header>
        <Link href="/">
          <Button>Home</Button>
        </Link>
      </Header>

      <SettingsForm />
    </Content>
  );
}
