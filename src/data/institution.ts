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

export const DEFAULT_INSTITUTION_PROFILE: InstitutionProfile = {
  name: 'SMK Negeri 6 Tebo',
  shortName: 'SMKN 6 Tebo',
  npsn: '10508365',
  address: 'Jl. Garuda RT. 15 / RW. 07, Desa Sapta Mulia, Kec. Rimbo Bujang, Kab. Tebo, Jambi 37553',
  district: 'Rimbo Bujang',
  regency: 'Kabupaten Tebo',
  province: 'Jambi',
  postalCode: '37553',
  principalName: 'Sulaswiji, S.H.',
  sarprasHeadName: 'Waka Sarana & Prasarana SMKN 6 Tebo',
  emailDomain: 'smkn6tebo.sch.id',
  departments: [
    'Teknik & Bisnis Sepeda Motor (TBSM)',
    'Desain Komunikasi Visual (DKV)',
    'Otomatisasi & Tata Kelola Perkantoran (OTKP)',
    'Akuntansi & Keuangan Lembaga (AKL)',
  ],
};

const INSTITUTION_PROFILE_STORAGE_KEY = 'sarpras_institution_profile_v1';

export function getInstitutionProfile(): InstitutionProfile {
  if (typeof window === 'undefined') {
    return DEFAULT_INSTITUTION_PROFILE;
  }
  try {
    const raw = window.localStorage.getItem(INSTITUTION_PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_INSTITUTION_PROFILE;
    const parsed = JSON.parse(raw) as Partial<InstitutionProfile>;
    return {
      ...DEFAULT_INSTITUTION_PROFILE,
      ...parsed,
      name: parsed.name?.trim() || DEFAULT_INSTITUTION_PROFILE.name,
      shortName: parsed.shortName?.trim() || parsed.name?.trim() || DEFAULT_INSTITUTION_PROFILE.shortName,
      address: parsed.address?.trim() || DEFAULT_INSTITUTION_PROFILE.address,
      principalName: parsed.principalName?.trim() || DEFAULT_INSTITUTION_PROFILE.principalName,
      sarprasHeadName: parsed.sarprasHeadName?.trim() || DEFAULT_INSTITUTION_PROFILE.sarprasHeadName,
    };
  } catch {
    return DEFAULT_INSTITUTION_PROFILE;
  }
}

export function saveInstitutionProfile(
  updates: Partial<InstitutionProfile>
): InstitutionProfile {
  const current = getInstitutionProfile();
  const next: InstitutionProfile = {
    ...current,
    ...updates,
  };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(INSTITUTION_PROFILE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  }
  return next;
}
