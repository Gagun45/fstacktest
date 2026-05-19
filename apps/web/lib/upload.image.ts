import { productService } from "@/features/products/products.api";

export const uploadSingleImage = async (file: File) => {
  const { data } = await productService.getUploadUrl({
    fileName: file.name,
    contentType: file.type,
  });

  const { key, publicUrl, uploadUrl } = data;

  // 2. upload to s3

  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return {
    url: publicUrl,
    key: key,
  };
};
