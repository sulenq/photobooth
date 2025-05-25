import * as yup from "yup";
import JSZip from "jszip";

type FileValidationParams = {
  maxSizeMB?: number;
  allowedExtensions?: string[];
  min?: number;
};

const fileValidation = ({
  maxSizeMB = 10,
  allowedExtensions,
  min = 0,
}: FileValidationParams = {}): yup.MixedSchema =>
  yup
    .mixed<File[]>()
    .test("fileRequired", "File wajib diunggah", (value) => {
      if (min > 0) {
        return Array.isArray(value) && value.length >= min;
      }
      return true; // not required if `min = 0`
    })
    .test("fileType", "Harus berupa file", (value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.every((item) => item instanceof File);
    })
    .test("fileSize", "Ukuran file terlalu besar", (value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      if (maxSizeMB) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return value.every((file) => file.size <= maxSizeBytes);
      }
      return true;
    })
    .test("fileExtension", "Ekstensi file tidak didukung", async (value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      if (allowedExtensions) {
        return value.every((file) => {
          const fileExtension = file.name.split(".").pop()?.toLowerCase();
          return allowedExtensions.includes(fileExtension || "");
        });
      }
      return true;
    })
    .test(
      "zipContents",
      "Isi .zip file tidak sesuai dengan kriteria",
      async (value) => {
        if (!Array.isArray(value) || value.length === 0) return true;
        for (const file of value) {
          if (file.name.endsWith(".zip")) {
            try {
              const zip = await JSZip.loadAsync(file);
              const filesInZip = Object.keys(zip.files);

              if (filesInZip.length === 0) return false; // ZIP empty

              const hasValidFile = filesInZip.some((fileName) => {
                const fileExtension = fileName.split(".").pop()?.toLowerCase();
                return allowedExtensions?.includes(fileExtension || "");
              });

              if (!hasValidFile) return false; // no match file in ZIP
            } catch (error) {
              return false; // ZIP corrupt
            }
          }
        }
        return true;
      }
    );

export { fileValidation };
