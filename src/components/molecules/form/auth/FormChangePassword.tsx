"use client";

import { useForm } from "react-hook-form";
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

import { getErrorMessage } from "@/utils/error-response";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/validators/auth/change-password-validator";
import { useChangePassword } from "@/http/auth/change-password";

export default function FormChangePassword() {
  const queryClient = useQueryClient();

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onChange",
  });

  const { mutate: changePasswordHandler, isPending } = useChangePassword({
    onSuccess: () => {
      toast.success("Password berhasil diubah!");
      queryClient.invalidateQueries({ queryKey: ["get-auth"] });
      form.reset();
    },
    onError: (error) => {
      toast.error("Gagal mengubah password!", {
        description: getErrorMessage(error),
      });
    },
  });

  const onSubmit = (values: ChangePasswordType) => {
    changePasswordHandler({ body: values });
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Saat Ini</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan password saat ini"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan password baru"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password Baru</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ulangi password baru"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Ganti Password"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
