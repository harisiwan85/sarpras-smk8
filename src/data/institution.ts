import { useCallback, useEffect, useState } from 'react';

export interface InstitutionProfile {
  name: string;
  shortName: string;
  npsn: string;
  address: string;
  district: string;
  regency: string;
  province: string;
  postalCode: string;
  principalName: string;
  sarprasHeadName: string;
  emailDomain: string;
  departments: string[];
}

/**
 * Identitas resmi lembaga. Semua tampilan aplikasi (header, footer, sidebar,
 * dasbor, PDF, label aset, kartu peminjaman, dan email bawaan) membaca dari
 * sini atau dari nilai tersimpan di halaman Pengaturan Pengguna.
 *
 * Sumber data: situs resmi SMK Muhammadiyah 8 Paciran (smkm08paciran.sch.id)
 * dan referensi data sekolah Kemendikdasmen (NPSN 20506243).
 */
export const DEFAULT_INSTITUTION_PROFILE: InstitutionProfile = {
  name: 'SMK Muhammadiyah 8 Paciran',
  shortName: 'SMK Muhammadiyah 8 Paciran',
  npsn: '20506243',
  address: 'Jl. Raya Daendels Km. 74,2, Karangasem, Kec. Paciran, Kab. Lamongan, Jawa Timur 62264',
  district: 'Paciran',
  regency: 'Kabupaten Lamongan',
  province: 'Jawa Timur',
  postalCode: '62264',
  principalName: 'Amilin',
  sarprasHeadName: 'Waka Sarana & Prasarana SMK Muhammadiyah 8 Paciran',
  emailDomain: 'smkm08paciran.sch.id',
  departments: [
    'Teknik Pemesinan (TPM)',
    'Teknik Pengelasan (TPL)',
    'Teknik Kendaraan Ringan Otomotif (TKRO)',
    'Teknik Sepeda Motor (TSM)',
    'Desain Komunikasi Visual (DKV)',
    'Asisten Keperawatan & Caregiver (AKC)',
    'Farmasi Klinis & Komunitas (FKK)',
  ],
};

const INSTITUTION_PROFILE_STORAGE_KEY = 'sarpras_institution_profile_v1';

/** Event internal agar seluruh komponen ikut berubah saat profil disimpan. */
const INSTITUTION_PROFILE_EVENT = 'sarpras:institution-profile-changed';

function normalizeProfile(parsed: Partial<InstitutionProfile>): InstitutionProfile {
  const departments = Array.isArray(parsed.departments)
    ? parsed.departments.filter((d): d is string => typeof d === 'string' && d.trim() !== '')
    : undefined;

  return {
    ...DEFAULT_INSTITUTION_PROFILE,
    ...parsed,
    name: parsed.name?.trim() || DEFAULT_INSTITUTION_PROFILE.name,
    shortName: parsed.shortName?.trim() || DEFAULT_INSTITUTION_PROFILE.shortName,
    npsn: parsed.npsn?.trim() || DEFAULT_INSTITUTION_PROFILE.npsn,
    address: parsed.address?.trim() || DEFAULT_INSTITUTION_PROFILE.address,
    district: parsed.district?.trim() || DEFAULT_INSTITUTION_PROFILE.district,
    regency: parsed.regency?.trim() || DEFAULT_INSTITUTION_PROFILE.regency,
    province: parsed.province?.trim() || DEFAULT_INSTITUTION_PROFILE.province,
    postalCode: parsed.postalCode?.trim() || DEFAULT_INSTITUTION_PROFILE.postalCode,
    principalName: parsed.principalName?.trim() || DEFAULT_INSTITUTION_PROFILE.principalName,
    sarprasHeadName: parsed.sarprasHeadName?.trim() || DEFAULT_INSTITUTION_PROFILE.sarprasHeadName,
    emailDomain: parsed.emailDomain?.trim() || DEFAULT_INSTITUTION_PROFILE.emailDomain,
    departments: departments && departments.length > 0
      ? departments.map((d) => d.trim())
      : DEFAULT_INSTITUTION_PROFILE.departments,
  };
}

export function getInstitutionProfile(): InstitutionProfile {
  if (typeof window === 'undefined') {
    return DEFAULT_INSTITUTION_PROFILE;
  }
  try {
    const raw = window.localStorage.getItem(INSTITUTION_PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_INSTITUTION_PROFILE;
    return normalizeProfile(JSON.parse(raw) as Partial<InstitutionProfile>);
  } catch {
    return DEFAULT_INSTITUTION_PROFILE;
  }
}

export function saveInstitutionProfile(
  updates: Partial<InstitutionProfile>
): InstitutionProfile {
  const current = getInstitutionProfile();
  const next = normalizeProfile({ ...current, ...updates });
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(INSTITUTION_PROFILE_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent(INSTITUTION_PROFILE_EVENT));
    } catch {
      // Ignore storage quota errors
    }
  }
  return next;
}

/** Kembalikan seluruh identitas ke profil bawaan sekolah. */
export function resetInstitutionProfile(): InstitutionProfile {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(INSTITUTION_PROFILE_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(INSTITUTION_PROFILE_EVENT));
    } catch {
      // Ignore storage errors
    }
  }
  return DEFAULT_INSTITUTION_PROFILE;
}

/** Domain email institusi tanpa "@", untuk placeholder & email bawaan. */
export function institutionEmailDomain(profile: InstitutionProfile): string {
  return profile.emailDomain.replace(/^@/, '');
}

/**
 * Nama penanggung jawab sarpras yang tampil sebagai penanda tangan resmi
 * (kartu peminjaman, PDF, dan laporan). Selalu mengikuti halaman Pengaturan.
 *
 * `approvedBy` lama tetap dihormati bila sudah berisi nama orang, tetapi nilai
 * generik warisan seperti "Admin Sarpras" atau "Waka Sarpras <sekolah lama>"
 * diganti dengan nama dari Pengaturan agar dokumen tidak pernah menampilkan
 * jabatan tanpa nama.
 */
export function resolveSarprasSigner(
  profile: InstitutionProfile,
  approvedBy?: string | null
): string {
  const stored = approvedBy?.trim();
  if (!stored) return profile.sarprasHeadName;

  const normalized = stored.toLowerCase();
  const isGenericPlaceholder =
    normalized === 'admin sarpras' ||
    normalized === 'waka sarpras' ||
    normalized.startsWith('admin sarpras ') ||
    normalized.startsWith('waka sarpras ');

  return isGenericPlaceholder ? profile.sarprasHeadName : stored;
}

/**
 * Hook reaktif: otomatis memperbarui semua komponen ketika profil lembaga
 * disimpan dari halaman Pengaturan, termasuk sinkron antar tab browser.
 */
export function useInstitutionProfile(): InstitutionProfile {
  const [profile, setProfile] = useState<InstitutionProfile>(() => getInstitutionProfile());

  const refresh = useCallback(() => {
    setProfile(getInstitutionProfile());
  }, []);

  useEffect(() => {
    window.addEventListener(INSTITUTION_PROFILE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(INSTITUTION_PROFILE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  return profile;
}
