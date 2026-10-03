'use client';

import { useState } from 'react';

export type FieldDef = { key: string; label: string; type?: string; ac?: string; half?: boolean; quarter?: boolean; area?: boolean; help?: string; optional?: boolean };

/** The design's field() helper: values + per-field errors (set from the server), cleared as the user edits. */
export function useFields(form: 'c' | 'co', blank: Record<string, string>) {
  const [vals, setVals] = useState(blank);
  const [errs, setErrs] = useState<Record<string, string | undefined>>({});
  const [tried, setTried] = useState(false);
  const field = (def: FieldDef) => {
    const id = `${form}-${def.key}`, err = errs[def.key], v = vals[def.key] || '';
    const ok = tried && !err && !!v;
    const desc = [def.help ? id + '-help' : null, err ? id + '-err' : null].filter(Boolean).join(' ');
    return {
      id, key: def.key, label: def.label, type: def.type || 'text', ac: def.ac || 'on', value: v,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target.value;
        setVals((x) => ({ ...x, [def.key]: val }));
        setErrs((x) => ({ ...x, [def.key]: undefined }));
      },
      error: err, hasError: !!err, ok, invalid: err ? 'true' : 'false',
      border: err ? '#9B3B2E' : ok ? '#4F8584' : 'rgba(36,59,59,.26)', describedBy: desc || undefined,
      help: def.help, hasHelp: !!def.help, helpId: id + '-help', errId: id + '-err',
      flex: def.quarter ? '1 1 140px' : def.half ? '1 1 220px' : '1 1 100%', isArea: !!def.area, isInput: !def.area,
    };
  };
  return { vals, setVals, errs, setErrs, tried, setTried, field, reset: () => { setVals(blank); setErrs({}); setTried(false); } };
}

export const focusField = (id: string) => setTimeout(() => document.getElementById(id)?.focus(), 30);
