import FormChangePassword from "@/components/molecules/form/auth/FormChangePassword";
import FormUpdateAccount from "@/components/molecules/form/auth/FormUpdateAccount";
import FormUpdateProfilePicture from "@/components/molecules/form/auth/FormUpdateProfilePicture";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardSettingWrapper() {
  return (
    <section>
      <FormUpdateProfilePicture />
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Akun</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <FormUpdateAccount />
        </TabsContent>
        <TabsContent value="password">
          <FormChangePassword />
        </TabsContent>
      </Tabs>
    </section>
  );
}
