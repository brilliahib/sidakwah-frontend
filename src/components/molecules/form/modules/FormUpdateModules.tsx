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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Modules } from "@/types/modules/modules";
import { useUpdateModule } from "@/http/modules/update-modules";
import {
  modulesSchema,
  ModulesType,
} from "@/validators/modules/modules-validator";

interface FormUpdateModulesProps {
  data?: Modules;
  id: number;
}

export default function FormUpdateModules({
  data,
  id,
}: FormUpdateModulesProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      title: data?.title ?? "",
      description: data?.description ?? "",
    }),
    [data],
  );

  const form = useForm<ModulesType>({
    resolver: zodResolver(modulesSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, defaultValues, form]);

  const { mutate: updateItemHandler, isPending } = useUpdateModule({
    onError: (error) => {
      const message = error.response?.data.meta.message ?? "Terjadi kesalahan.";
      toast.error("Gagal memperbarui modul!", { description: message });
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui modul!");
      queryClient.invalidateQueries({ queryKey: ["get-all-modules"] });
      router.push("/dashboard/admin/modules");
    },
  });

  const onSubmit = (body: ModulesType) => {
    updateItemHandler({ id, body });
  };

  return (
    <>
      <Card>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Judul <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" />
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
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? "Loading..." : "Simpan Perubahan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
