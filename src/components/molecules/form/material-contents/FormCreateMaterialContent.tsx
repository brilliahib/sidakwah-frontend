"use client";

import TiptapEditor from "@/components/atoms/text-editor/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMaterialContent } from "@/http/material-contents/create-material-content";
import { useGetAllSubModules } from "@/http/sub-modules/get-all-sub-modules";
import { convertYoutubeToEmbed } from "@/lib/convert-yt";
import { cn } from "@/lib/utils";
import { MaterialContentType } from "@/validators/material-contents/material-content-validator";
import { Check, ChevronsUpDown, CloudUpload, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateMaterialContent() {
  const form = useForm<MaterialContentType>({
    defaultValues: {
      sub_modul_id: 0,
      title: "",
      youtube_link: "",
      article_title: "",
      article_content: "",
      article_images: null,
    },
    mode: "onChange",
  });

  const { data: session, status } = useSession();
  const router = useRouter();
  const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isArticleActive, setIsArticleActive] = useState(false);

  const handleVideoToggle = (checked: boolean) => {
    setIsVideoActive(checked);

    if (!checked) {
      form.setValue("youtube_link", "");
    }
  };

  const handleArticleToggle = (checked: boolean) => {
    setIsArticleActive(checked);

    if (!checked) {
      form.setValue("article_title", "");
      form.setValue("article_content", "");
      form.setValue("article_images", null);
      setImageUrlPreview(null);
    }
  };

  const { data } = useGetAllSubModules(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      form.setValue("article_images", file);
      setImageUrlPreview(URL.createObjectURL(file));
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeImage = () => {
    form.setValue("article_images", null);
    setImageUrlPreview(null);
  };

  const { mutate: createMaterialContentHandler, isPending } =
    useCreateMaterialContent({
      onSuccess: () => {
        toast.success("Berhasil menambahkan konten materi baru!");
        router.push("/dashboard/admin/material-contents");
      },
      onError: () => {
        toast.error("Gagal menambahkan konten materi baru!");
      },
    });

  const onSubmit = (data: MaterialContentType) => {
    createMaterialContentHandler({
      ...data,
      youtube_link: isVideoActive
        ? convertYoutubeToEmbed(data.youtube_link)
        : undefined,
      article_title: isArticleActive ? data.article_title : undefined,
      article_content: isArticleActive ? data.article_content : undefined,
      article_images: isArticleActive ? data.article_images : undefined,
    });
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
                    Judul Konten Materi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan judul konten materi"
                      {...field}
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sub_modul_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Sub Modul <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isPopoverOpen}
                          className="w-full justify-between font-normal"
                        >
                          {field.value
                            ? data?.data.find(
                                (subModul) => subModul.id === field.value
                              )?.title
                            : "Pilih sub modul"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Cari sub modul..." />
                          <CommandList>
                            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                              {data?.data.map((subModul) => (
                                <CommandItem
                                  key={subModul.id}
                                  value={subModul.title}
                                  onSelect={() => {
                                    field.onChange(subModul.id);
                                    setIsPopoverOpen(false);
                                  }}
                                  className="font-normal"
                                >
                                  {subModul.title}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      field.value === subModul.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-primary/10">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Konten Video</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Aktifkan jika materi memiliki video Youtube
                </p>
              </div>
              <Switch
                checked={isVideoActive}
                onCheckedChange={handleVideoToggle}
              />
            </FormItem>

            {isVideoActive && (
              <FormField
                control={form.control}
                name="youtube_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Video (Youtube)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isVideoActive && form.watch("youtube_link") && (
              <iframe
                src={convertYoutubeToEmbed(form.watch("youtube_link"))}
                className="aspect-video w-full rounded-lg"
              />
            )}

            <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-primary/10">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Konten Artikel</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Aktifkan jika materi memiliki artikel
                </p>
              </div>
              <Switch
                checked={isArticleActive}
                onCheckedChange={handleArticleToggle}
              />
            </FormItem>

            {isArticleActive && (
              <>
                <FormField
                  control={form.control}
                  name="article_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Artikel</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan judul artikel"
                          {...field}
                          className="min-h-[100px]"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="article_images"
                  render={() => (
                    <FormItem>
                      <FormLabel>Gambar Artikel</FormLabel>
                      <FormControl>
                        <div>
                          <div
                            {...getRootProps()}
                            className={`border-primary bg-primary/10 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed py-8 ${
                              isDragActive
                                ? "border-gray-300"
                                : "border-gray-300"
                            }`}
                          >
                            <Input {...getInputProps()} />
                            {imageUrlPreview ? (
                              <div className="relative flex w-full justify-center">
                                <Image
                                  src={imageUrlPreview}
                                  alt="Preview"
                                  className="max-h-[200px] w-fit rounded-lg object-cover"
                                  width={1000}
                                  height={1000}
                                />
                                <Button
                                  className="absolute top-2 right-2 px-3 shadow-lg"
                                  variant="destructive"
                                  onClick={removeImage}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : isDragActive ? (
                              <p className="text-blue-500">
                                Drop gambar di sini ...
                              </p>
                            ) : (
                              <div className="space-y-4 py-4 text-center">
                                <CloudUpload className="text-primary mx-auto h-10 w-10" />
                                <div>
                                  <p className="text-sm">
                                    Drag & drop gambar ke sini, atau klik untuk
                                    memilih
                                  </p>
                                  <p className="text-sm">
                                    (maksimal ukuran gambar 2 MB)
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="article_content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Isi Artikel</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
