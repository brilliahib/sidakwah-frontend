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
import { useGetAllModules } from "@/http/modules/get-all-modules";
import { useCreateSubModules } from "@/http/sub-modules/create-sub-modules";
import {
  subModulesSchema,
  SubModulesType,
} from "@/validators/sub-modules/sub-modules-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateSubModules() {
  const form = useForm<SubModulesType>({
    resolver: zodResolver(subModulesSchema),
    defaultValues: {
      title: "",
      description: "",
      modul_id: 0,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: session, status } = useSession();

  const { data } = useGetAllModules(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const { mutate: createSubModulesHandler, isPending } = useCreateSubModules({
    onError: () => {
      toast.error("Gagal menambahkan sub-modul!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan sub-modul baru!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-sub-modules"],
      });
      router.push("/dashboard/admin/sub-modules");
    },
  });

  const onSubmit = (body: SubModulesType) => {
    createSubModulesHandler({ ...body });
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
          name="modul_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Modul <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Modul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pilihan Modul</SelectLabel>
                      {data?.data.map((module) => (
                        <SelectItem key={module.id} value={String(module.id)}>
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
