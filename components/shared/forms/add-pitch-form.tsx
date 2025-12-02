"use client";

import { useState } from "react";
import { Loader2, Plus, X, UploadCloud, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent } from "@/components/ui/card";
import { set, z } from "zod";
import { pitchFormSchema } from "@/lib/zodSchemas";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { uploadToImageKit } from "@/lib/actions/upload.actions";
import { createPitch } from "@/lib/actions/pitch.actions";
import { useRouter } from "next/navigation";

type PitchFormValues = z.infer<typeof pitchFormSchema>;

export default function AddPitchForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const form = useForm<PitchFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(pitchFormSchema) as any,
    defaultValues: {
      name: "",
      type: "",
      pricePerHour: 0,
      description: "",
      rules: [{ value: "No metal studs allowed" }],
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "rules",
    control: form.control,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setFilesToUpload((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
      const currentImages = form.getValues("images");
      form.setValue("images", [...currentImages, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setFilesToUpload((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    const currentImages = form.getValues("images");
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  async function onSubmit(data: PitchFormValues) {
    setIsLoading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return await uploadToImageKit(formData);
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      const finalData = {
        ...data,
        images: uploadedUrls,
      };

      const result = await createPitch(finalData);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        form.reset();
        setFilesToUpload([]);
        setPreviewImages([]);
        router.push("/admin/pitches");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Pitch Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Alpha Arena"
                      className="bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-zinc-950/50 border-white/10 text-zinc-300 focus:ring-emerald-500/50">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="5v5">5-a-side</SelectItem>
                      <SelectItem value="7v7">7-a-side</SelectItem>
                      <SelectItem value="11v11">11-a-side</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="pricePerHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">
                  Price per Hour ($)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="40"
                    className="bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500/50"
                    {...field}
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
                <FormLabel className="text-zinc-300">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the turf quality, lighting, etc..."
                    className="bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500/50 min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <FormLabel className="text-zinc-300">Pitch Images</FormLabel>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {previewImages.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group"
                  >
                    <Image
                      src={src}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative border-2 border-dashed border-white/10 rounded-xl bg-zinc-950/30 hover:bg-zinc-950/50 transition-colors flex flex-col items-center justify-center py-8 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="bg-emerald-500/10 p-3 rounded-full mb-3">
                <UploadCloud className="h-6 w-6 text-emerald-500" />
              </div>
              <p className="text-sm text-zinc-300 font-medium">
                Click to upload images
              </p>
              <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
            {form.formState.errors.images && (
              <p className="text-xs text-red-500 font-medium">
                {form.formState.errors.images.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <FormLabel className="text-zinc-300">Venue Rules</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 h-8"
                onClick={() => append({ value: "" })}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Rule
              </Button>
            </div>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`rules.${index}.value`}
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="e.g. No food on the pitch"
                            className="bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500/50 h-9"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {form.formState.errors.rules && (
              <p className="text-xs text-red-500 font-medium">
                {form.formState.errors.rules.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg shadow-emerald-900/20 mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                Pitch...
              </>
            ) : (
              "Create Pitch"
            )}
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}
