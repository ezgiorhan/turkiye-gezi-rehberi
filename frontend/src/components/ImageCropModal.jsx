import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImageBlob } from "../utils/cropImage";

// Kullanıcının seçtiği fotoğrafı sabit bir orana (4:3) kırpmasını sağlayan
// tam ekran modal. Hem PC'de fareyle sürükleme/tekerlekle yakınlaştırma, hem
// telefonda parmakla sürükleme/iki parmakla yakınlaştırma destekler.
export default function ImageCropModal({ imageSrc, onCancel, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_croppedArea, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels);
      onCropDone(blob);
    } catch {
      onCancel();
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4">
      <div className="relative flex-1 overflow-hidden rounded-xl bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/80">🔍 Yakınlaştır</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full sm:w-40"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={processing}
            className="rounded-full bg-cini-turkuaz px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {processing ? "İşleniyor…" : "Kırp ve Kullan"}
          </button>
        </div>
      </div>
    </div>
  );
}
