import { SettingsForm } from "@/app/settings/SettingsForm";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Settings() {
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
