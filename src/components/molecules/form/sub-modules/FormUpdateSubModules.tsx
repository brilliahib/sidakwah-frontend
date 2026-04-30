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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useGetAllModules } from "@/http/modules/get-all-modules";
import { SubModules } from "@/types/sub-modules/sub-modules";
import {
  subModulesSchema,
  SubModulesType,
} from "@/validators/sub-modules/sub-modules-validator";
import { useUpdateSubModule } from "@/http/sub-modules/update-sub-modules";

interface FormUpdateSubModulesProps {
  data?: SubModules;
  id: number;
}

export default function FormUpdateSubModules({
  data,
  id,
}: FormUpdateSubModulesProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: session, status } = useSession();

  const { data: modules } = useGetAllModules(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const defaultValues = useMemo(
    () => ({
      title: data?.title ?? "",
      description: data?.description ?? "",
      modul_id: data?.modul_id ?? 0,
    }),
    [data],
  );

  const form = useForm<SubModulesType>({
    resolver: zodResolver(subModulesSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, defaultValues, form]);

  const { mutate: updateSubModulesHandler, isPending } = useUpdateSubModule({
    onError: (error) => {
      const message = error.response?.data.meta.message ?? "Terjadi kesalahan.";
      toast.error("Gagal memperbarui sub-modul!", { description: message });
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui sub-modul!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-sub-modules"],
      });
      router.push("/dashboard/admin/sub-modules");
    },
  });

  const onSubmit = (body: SubModulesType) => {
    updateSubModulesHandler({ id, body });
  };

  return (
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
                    Judul Sub Modul <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Masukkan judul sub modul"
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
              name="modul_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Modul <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Modul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pilihan Modul</SelectLabel>
                          {modules?.data.map((module) => (
                            <SelectItem
                              key={module.id}
                              value={String(module.id)}
                            >
                              {module.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                  <FormLabel>Deskripsi Sub Modul</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="description"
                      placeholder="Masukkan deskripsi sub modul"
                      {...field}
                      className="h-10"
                    />
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
  );
}
