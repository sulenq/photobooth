const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const fs = require("fs");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

function generateVideoFromBase64Images(base64Images, outputPath) {
  const tempDir = path.join(__dirname, "temp_images");
  fs.mkdirSync(tempDir, { recursive: true });

  // Simpan base64 ke file png
  base64Images.forEach((b64, i) => {
    const base64 = b64.split(",")[1];
    const buffer = Buffer.from(base64, "base64");
    fs.writeFileSync(path.join(tempDir, `img${i}.png`), buffer);
  });

  return new Promise((resolve, reject) => {
    const command = ffmpeg();

    base64Images.forEach((_, i) => {
      command
        .input(path.join(tempDir, `img${i}.png`))
        .inputOptions(["-loop 1", "-t 1", "-framerate 1"]);
    });

    command
      .outputOptions([
        "-vf",
        "fps=1",
        "-pix_fmt",
        "yuv420p",
        "-c:v",
        "libx264",
        "-r",
        "1",
      ])
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
