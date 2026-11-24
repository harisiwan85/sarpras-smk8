import React from 'react';

/**
 * Logo resmi sekolah.
 *
 * Berkas berada di `public/assets/brand/logo-sekolah.png` sehingga dapat
 * dipakai sebagai aset statis, favicon, maupun gambar pada dokumen cetak.
 */
export const SCHOOL_LOGO_SRC = '/assets/brand/logo-sekolah.png';

interface SchoolLogoProps {
  /** Ukuran sisi logo dalam piksel (default 40). */
  size?: number;
  className?: string;
  /** Menampilkan bingkai putih membulat di sekeliling logo. */
  framed?: boolean;
  alt?: string;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  size = 40,
  className = '',
  framed = true,
  alt = 'Logo SMK Muhammadiyah 8 Paciran',
}) => {
  const image = (
    <img
      src={SCHOOL_LOGO_SRC}
      alt={alt}
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      className="w-full h-full object-contain select-none"
      draggable={false}
    />
  );

  if (!framed) {
    return (
      <div
        className={`shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {image}
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 bg-white rounded-2xl p-1 shadow-md shadow-blue-500/15 ring-1 ring-slate-200/70 ${className}`}
      style={{ width: size, height: size }}
    >
      {image}
    </div>
  );
};
