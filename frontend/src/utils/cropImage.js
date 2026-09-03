// react-easy-crop'un verdiği kırpma alanı koordinatlarını kullanarak, orijinal
// görselden gerçek bir kırpılmış görsel (Blob) üretir. Modern tarayıcılar
// <img>/<canvas> üzerinde EXIF y\u00f6n bilgisini (telefon kameras\u0131n\u0131n d\u00f6nd\u00fcrme
// bilgisi) otomatik uygulad\u0131\u011f\u0131 i\u00e7in, sonu\u00e7 her cihazda ayn\u0131 do\u011fru y\u00f6nde \u00e7\u0131kar.

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });
}

export async function getCroppedImageBlob(imageSrc, croppedAreaPixels, mimeType = "image/jpeg") {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Kırpma sırasında bir hata oluştu."));
          return;
        }
        resolve(blob);
      },
      mimeType,
      0.9
    );
  });
}
