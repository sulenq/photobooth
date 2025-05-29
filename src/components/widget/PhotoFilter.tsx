import { useEffect, useRef, useState } from "react";

type Props = {
  base64: string;
};

const filters = [
  "original",
  "vivid",
  "bright",
  "vignette",
  "bw",
  "sepia",
  "warm",
  "cool",
  "soft",
];

const filterMap: Record<string, (this: any) => void> = {
  vivid() {
    this.exposure(10).contrast(15);
  },
  bright() {
    this.brightness(15);
  },
  vignette() {
    this.vignette("20%", 30);
  },
  bw() {
    this.greyscale().contrast(20);
  },
  sepia() {
    this.sepia(60);
  },
  warm() {
    this.channels({
      red: 30,
      green: 10,
      blue: -10,
    });
  },
  cool() {
    this.channels({
      red: -10,
      green: 10,
      blue: 30,
    });
  },
  soft() {
    this.contrast(-10).brightness(10).saturation(-15);
  },
  original() {
    // no filter
  },
};

declare global {
  interface Window {
    Caman: any;
  }
}

const PhotoFilter = ({ base64 }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("original");

  useEffect(() => {
    if (!canvasRef.current || !window.Caman) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // Penting kalau gambar dari sumber beda
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Reset ukuran & isi canvas
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      if (currentFilter !== "original") {
        setTimeout(() => {
          window.Caman(canvas, function (this: any) {
            this.revert(true);
            filterMap[currentFilter]?.call(this);
            this.render();
          });
        }, 10);
      }
    };

    img.src = base64;
  }, [base64, currentFilter]);

  return (
    <div>
      <canvas ref={canvasRef} id="photo-canvas" />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setCurrentFilter(filter)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              background: currentFilter === filter ? "#333" : "#eee",
              color: currentFilter === filter ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoFilter;
