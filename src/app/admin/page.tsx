'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CaseItem {
  id: number;
  title: string;
  description: string;
  location: string;
  work_date: string | null;
  image_urls: string[];
  published: boolean;
  created_at: string;
}

/* ──────────────── Mini Calendar ──────────────── */
function MiniCalendar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(value ? parseInt(value.slice(0, 4)) : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value ? parseInt(value.slice(5, 7)) - 1 : today.getMonth());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const selectedDate = value || '';
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const handleSelect = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(dateStr);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const formatDisplay = (v: string) => {
    if (!v) return '';
    const [y, m, d] = v.split('-');
    return `${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full border rounded-xl px-4 py-3 text-sm text-left flex items-center gap-2.5 transition-all ${open ? 'border-primary ring-2 ring-primary/20 bg-white' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-[18px] h-[18px] flex-shrink-0 ${value ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>{value ? formatDisplay(value) : '날짜를 선택하세요'}</span>
        {value && (
          <button type="button" onClick={e => { e.stopPropagation(); onChange(''); }} className="ml-auto text-gray-300 hover:text-gray-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 w-[300px] animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-sm font-bold text-gray-800">{viewYear}년 {monthNames[viewMonth]}</span>
            <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-1">
            {dayNames.map(d => (
              <div key={d} className={`text-center text-[11px] font-semibold py-1.5 ${d === '일' ? 'text-red-400' : d === '토' ? 'text-blue-400' : 'text-gray-400'}`}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {blanks.map(b => <div key={`b${b}`} />)}
            {days.map(day => {
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === todayStr;
              const dayOfWeek = new Date(viewYear, viewMonth, day).getDay();
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(day)}
                  className={`w-full aspect-square flex items-center justify-center text-[13px] rounded-lg transition-all relative
                    ${isSelected ? 'bg-primary text-white font-bold shadow-md' : isToday ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100 text-gray-700'}
                    ${!isSelected && dayOfWeek === 0 ? 'text-red-400' : ''} ${!isSelected && dayOfWeek === 6 ? 'text-blue-400' : ''}
                  `}
                >
                  {day}
                  {isToday && !isSelected && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
                </button>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => { onChange(todayStr); setOpen(false); }} className="flex-1 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 py-2 rounded-lg transition-colors">오늘</button>
            <button type="button" onClick={() => { onChange(''); setOpen(false); }} className="flex-1 text-xs font-medium text-gray-500 hover:bg-gray-100 py-2 rounded-lg transition-colors">초기화</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────── Drag & Drop Image Upload ──────────────── */
function ImageUploadArea({ imageUrls, setImageUrls, uploading, setUploading }: {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const upload = async (files: File[]) => {
    setUploading(true);
    setUploadProgress(0);
    const total = files.length;
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const { url } = await res.json();
        newUrls.push(url);
      }
      setUploadProgress(Math.round(((i + 1) / total) * 100));
    }

    setImageUrls(prev => [...prev, ...newUrls]);
    setUploading(false);
    setUploadProgress(0);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length) upload(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    upload(Array.from(files));
    e.target.value = '';
  };

  const removeImage = (idx: number) => setImageUrls(prev => prev.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        사진
        {imageUrls.length > 0 && <span className="text-xs font-normal text-gray-400 ml-1">{imageUrls.length}장</span>}
      </label>

      {/* Image grid */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 shadow-sm">
              <Image src={url} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-500 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-all">{idx + 1}</span>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl py-6 px-4 transition-all cursor-pointer ${dragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'}`}
      >
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          {uploading ? (
            <>
              <div className="w-full max-w-[200px] bg-gray-200 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
              <span className="text-xs text-gray-500">업로드 중... {uploadProgress}%</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-gray-600">사진을 드래그하거나 <span className="text-primary font-semibold">클릭하여 선택</span></span>
                <p className="text-[11px] text-gray-400 mt-0.5">JPG, PNG, WEBP (여러 장 가능)</p>
              </div>
            </>
          )}
          <input type="file" accept="image/*" multiple onChange={handleFileInput} className="hidden" disabled={uploading} />
        </label>
      </div>
    </div>
  );
}

/* ──────────────── Main Admin Page ──────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [workDate, setWorkDate] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [published, setPublished] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCases = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/cases');
    if (res.ok) {
      const data = await res.json();
      setCases(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchCases();
  }, [authed, fetchCases]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      setLoginError('비밀번호가 올바르지 않습니다.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setWorkDate('');
    setImageUrls([]);
    setPublished(true);
    setEditingCase(null);
    setShowForm(false);
  };

  const openNewForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (c: CaseItem) => {
    setEditingCase(c);
    setTitle(c.title);
    setDescription(c.description || '');
    setLocation(c.location || '');
    setWorkDate(c.work_date || '');
    setImageUrls(c.image_urls || []);
    setPublished(c.published);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { title, description, location, work_date: workDate || null, image_urls: imageUrls, published };

    if (editingCase) {
      await fetch(`/api/admin/cases/${editingCase.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/admin/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    resetForm();
    fetchCases();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/cases/${id}`, { method: 'DELETE' });
    fetchCases();
  };

  const togglePublished = async (c: CaseItem) => {
    await fetch(`/api/admin/cases/${c.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...c, published: !c.published, updated_at: new Date().toISOString() }),
    });
    fetchCases();
  };

  const formatDate = (d: string | null) => {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return `${y}.${m}.${day}`;
  };

  /* ──── Login ──── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-10 w-full max-w-[380px] border border-gray-100/80">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">관리자 로그인</h1>
            <p className="text-sm text-gray-400 mt-2">우승스카이차 시공사례 관리</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
                autoFocus
              />
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {loginError}
              </div>
            )}
            <button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-700 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-[0.98]">
              로그인
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-primary transition-colors">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  /* ──── Dashboard ──── */
  return (
    <div className="min-h-screen bg-gray-50/80">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-primary/10 flex items-center justify-center transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
              </svg>
            </Link>
            <div>
              <h1 className="text-[17px] font-extrabold text-gray-900 leading-tight">시공사례 관리</h1>
              <p className="text-[11px] text-gray-400">{cases.length}개의 사례</p>
            </div>
          </div>
          <button
            onClick={openNewForm}
            className="bg-gradient-to-r from-primary to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.97] flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            새 사례 등록
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Form Modal ── */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-6 sm:pt-12 px-4 overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) resetForm(); }}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mb-8 border border-gray-100 overflow-hidden">
              {/* Modal header */}
              <div className="px-7 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">{editingCase ? '사례 수정' : '새 사례 등록'}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{editingCase ? '작업 사례 정보를 수정합니다' : '새로운 작업 사례를 등록합니다'}</p>
                </div>
                <button onClick={resetForm} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <form onSubmit={handleSave} className="p-7 space-y-5">
                {/* Title */}
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    제목 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="예: 00빌딩 외벽 유리 교체 작업"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    설명
                  </label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    placeholder="작업 내용을 설명해주세요"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all bg-gray-50/50 focus:bg-white"
                  />
                </div>

                {/* Location & Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      작업 위치
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="예: 서울 강남구"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      작업 일자
                    </label>
                    <MiniCalendar value={workDate} onChange={setWorkDate} />
                  </div>
                </div>

                {/* Images */}
                <ImageUploadArea
                  imageUrls={imageUrls}
                  setImageUrls={setImageUrls}
                  uploading={uploading}
                  setUploading={setUploading}
                />

                {/* Published toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${published ? 'bg-green-100' : 'bg-gray-200'} transition-colors`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${published ? 'text-green-600' : 'text-gray-400'} transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {published
                          ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          : <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        }
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">{published ? '공개' : '비공개'}</span>
                      <p className="text-[11px] text-gray-400">{published ? '시공사례 페이지에 표시됩니다' : '관리자만 볼 수 있습니다'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPublished(!published)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${published ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${published ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all active:scale-[0.98]"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={saving || !title.trim()}
                    className="flex-[2] bg-gradient-to-r from-primary to-blue-700 text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-40 disabled:hover:shadow-none flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>저장 중...</>
                    ) : editingCase ? (
                      <><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>수정 완료</>
                    ) : (
                      <><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>등록하기</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Cases List ── */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-32 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-semibold text-lg">등록된 시공사례가 없습니다</p>
            <p className="text-gray-400 text-sm mt-1.5">첫 번째 작업 사례를 등록해보세요</p>
            <button onClick={openNewForm} className="mt-6 bg-gradient-to-r from-primary to-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.97] inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              첫 사례 등록하기
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cases.map(c => (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all group">
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  {c.image_urls && c.image_urls.length > 0 ? (
                    <div className="sm:w-52 h-44 sm:h-auto relative flex-shrink-0 overflow-hidden">
                      <Image src={c.image_urls[0]} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      {c.image_urls.length > 1 && (
                        <span className="absolute bottom-2.5 right-2.5 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">
                          +{c.image_urls.length - 1}장
                        </span>
                      )}
                      {!c.published && (
                        <span className="absolute top-2.5 left-2.5 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">비공개</span>
                      )}
                    </div>
                  ) : (
                    <div className="sm:w-52 h-44 sm:h-auto bg-gray-100 flex items-center justify-center flex-shrink-0 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {!c.published && (
                        <span className="absolute top-2.5 left-2.5 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">비공개</span>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-[16px] mb-1.5">{c.title}</h3>
                      {c.description && (
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{c.description}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {c.location && (
                          <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {c.location}
                          </span>
                        )}
                        {c.work_date && (
                          <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {formatDate(c.work_date)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => togglePublished(c)}
                          className={`p-2 rounded-lg transition-colors ${c.published ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                          title={c.published ? '비공개로 전환' : '공개로 전환'}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {c.published
                              ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              : <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            }
                          </svg>
                        </button>
                        <button
                          onClick={() => openEditForm(c)}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                          title="수정"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
