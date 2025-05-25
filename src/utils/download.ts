export default function download(
  blob: any,
  downloadName: string = "download",
  ext: string
) {
  const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", `${downloadName}.${ext}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
