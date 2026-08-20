/**
 * Minimal file-signature ("magic bytes") check for uploaded images. Multer's
 * fileFilter only sees the client-supplied Content-Type header, which is
 * trivial to spoof (e.g. renaming a .exe to photo.jpg and sending
 * `image/jpeg`) — this instead looks at the first bytes actually written to
 * the buffer, so a mismatched or unrecognized file is rejected before it
 * ever reaches Cloudinary. Deliberately dependency-free: these are the same
 * four formats allowed by middleware/upload.ts.
 */
type SignatureCheck = (buffer: Buffer) => boolean;

const SIGNATURES: Record<string, SignatureCheck> = {
  "image/jpeg": (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/png": (b) =>
    b.length > 8 &&
    b[0] === 0x89 &&
    b[1] === 0x50 &&
    b[2] === 0x4e &&
    b[3] === 0x47 &&
    b[4] === 0x0d &&
    b[5] === 0x0a &&
    b[6] === 0x1a &&
    b[7] === 0x0a,
  "image/gif": (b) => b.length > 3 && b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38,
  // WEBP is a RIFF container: bytes 0-3 "RIFF", bytes 8-11 "WEBP".
  "image/webp": (b) =>
    b.length > 12 &&
    b[0] === 0x52 &&
    b[1] === 0x49 &&
    b[2] === 0x46 &&
    b[3] === 0x46 &&
    b[8] === 0x57 &&
    b[9] === 0x45 &&
    b[10] === 0x42 &&
    b[11] === 0x50,
};

/** True only if `buffer` actually starts with the signature for `mimeType`. */
export function matchesDeclaredImageType(buffer: Buffer, mimeType: string): boolean {
  const check = SIGNATURES[mimeType];
  return check ? check(buffer) : false;
}
