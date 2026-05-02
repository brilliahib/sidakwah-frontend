"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/utils/error-response";
import { getImagePreviewUrl } from "@/utils/get-image-preview";
import { useSession } from "next-auth/react";
import {
  updateAccountSchema,
  UpdateAccountType,
} from "@/validators/auth/update-account-validator";
import { useUpdateAccount } from "@/http/auth/update-account";

export default function FormUpdateAccount() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const defaultValues = useMemo(
    () => ({
      name: session?.user.name ?? "",
      email: session?.user.email ?? "",
      username: session?.user.username ?? "",
      phone_number: session?.user.phone_number ?? "",
      address: session?.user.address ?? "",
    }),
    [
      session?.user.name,
      session?.user.email,
      session?.user.username,
      session?.user.phone_number,
      session?.user.address,
    ],
  );

  const form = useForm<UpdateAccountType>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!session) return;

    form.reset(defaultValues);
  }, [session, defaultValues, form]);

  const { mutate: updateAccountHandler, isPending: isUpdatingAccount } =
    useUpdateAccount({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-auth"] });
        toast.success("Berhasil memperbarui akun Anda!");
      },
      onError: (error) => {
        toast.error("Gagal memperbarui akun!", {
          description: getErrorMessage(error),
        });
      },
    });

  const onSubmit = (data: UpdateAccountType) => {
    updateAccountHandler({ body: data });
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukkan email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nomor telepon"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alamat"
                      {...field}
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isUpdatingAccount}>
                {isUpdatingAccount ? "Loading..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
