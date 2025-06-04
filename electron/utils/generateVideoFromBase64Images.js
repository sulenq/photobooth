const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const fs = require("fs");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

function generateVideoFromBase64Images(base64Images, outputPath) {
  const tempDir = path.join(__dirname, "temp_images");
  fs.mkdirSync(tempDir, { recursive: true });

  // Simpan base64 ke file png
  const imagePaths = base64Images.map((b64, i) => {
    const base64 = b64.split(",")[1];
    const buffer = Buffer.from(base64, "base64");
    const imgPath = path.join(tempDir, `img${i}.png`);
    fs.writeFileSync(imgPath, buffer);
    return imgPath;
  });

  // Buat file list input.txt untuk ffmpeg
  const listPath = path.join(tempDir, "input.txt");
  const listContent = imagePaths
    .map((imgPath) => `file '${imgPath}'\nduration 1`)
    .join("\n");
  const finalContent = `${listContent}\nfile '${
    imagePaths[imagePaths.length - 1]
  }'`;
  fs.writeFileSync(listPath, finalContent);

  return new Promise((resolve, reject) => {
    ffmpeg()
      .addInput(listPath)
      .inputFormat("concat")
      .inputOptions(["-safe 0"])
      .outputOptions(["-vf", "fps=1", "-pix_fmt", "yuv420p", "-c:v", "libx264"])
      .on("end", () => {
        fs.rmSync(tempDir, { recursive: true, force: true });
        resolve(outputPath);
      })
      .on("error", (err) => {
        fs.rmSync(tempDir, { recursive: true, force: true });
        reject(err);
      })
      .save(outputPath);
  });
}

module.exports = { generateVideoFromBase64Images };
