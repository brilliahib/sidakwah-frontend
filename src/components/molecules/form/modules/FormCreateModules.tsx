"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateModules } from "@/http/modules/create-modules";
import {
  modulesSchema,
  ModulesType,
} from "@/validators/modules/modules-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateModules() {
  const form = useForm<ModulesType>({
    resolver: zodResolver(modulesSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate: createModulesHandler, isPending } = useCreateModules({
    onError: () => {
      toast.error("Gagal menambahkan modul!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan modul baru!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-modules"],
      });
      router.push("/dashboard/admin/modules");
    },
  });

  const onSubmit = (body: ModulesType) => {
    createModulesHandler({ ...body });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Modul <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="title"
                  placeholder="Masukkan judul modul"
                  {...field}
                  className="h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Modul</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="description"
                  placeholder="Masukkan deskripsi modul"
                  {...field}
                  className="h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" size={"lg"} disabled={isPending}>
            {isPending ? "Loading..." : "Tambahkan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
