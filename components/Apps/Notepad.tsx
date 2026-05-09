// components/Apps/Notepad.tsx
import React from 'react';

const Notepad: React.FC = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', color: '#000', fontFamily: 'Consolas, monospace' }}>
      <div style={{ 
        padding: '2px 8px', 
        fontSize: '11px', 
        borderBottom: '1px solid #dfdfdf',
        background: '#f0f0f0',
        display: 'flex',
        gap: '12px',
        fontFamily: '"Segoe UI", sans-serif'
      }}>
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>
      <div 
        style={{ 
          flexGrow: 1, 
          border: 'none', 
          outline: 'none', 
          padding: '20px',
          fontSize: '13px',
          lineHeight: '1.8',
          whiteSpace: 'pre-wrap',
          overflowY: 'auto',
          userSelect: 'text'
        }}
      >
FILE: MASA_DEPAN_KITA.TXT
==================================================

[ SEKSI I: IMPIAN AKBAR & MAFTUKAH ]
--------------------------------------------------

01. VISI KELUARGA
    &gt; Membangun rumah tangga Sakinah
    &gt; Menanamkan nilai Mawaddah
    &gt; Mewujudkan suasana Warahmah
    &gt; Berlandaskan kasih sayang tulus

02. HUNIAN NYAMAN
    &gt; Memiliki rumah mungil minimalis
    &gt; Taman kecil di area depan/belakang
    &gt; Tempat bersantai minum teh sore
    &gt; Suasana asri dan menenangkan

03. KARIR & DUKUNGAN
    &gt; Sukses dalam profesi masing-masing
    &gt; Saling support setiap langkah
    &gt; Menjadi rekan diskusi yang baik
    &gt; Tumbuh bersama secara finansial

04. PETUALANGAN BERSAMA
    &gt; Menjelajahi destinasi impian
    &gt; Menciptakan memori di tiap kota
    &gt; Healing rutin setiap tahun
    &gt; Quality time tanpa gangguan

05. SUDUT LITERASI
    &gt; Perpustakaan pribadi di rumah
    &gt; Koleksi buku favorit berdua
    &gt; Area membaca yang estetik
    &gt; Warisan ilmu untuk masa depan

06. INSPIRASI SEKITAR
    &gt; Berbagi energi positif ke sesama
    &gt; Menjadi pasangan yang produktif
    &gt; Menginspirasi lingkungan terdekat
    &gt; Bahagia dunia dan akhirat


[ SEKSI II: DESTINASI HEALING INDONESIA ]
--------------------------------------------------

• LABUAN BAJO (NTT)
  - Sunset di Bukit Sylvia
  - Keajaiban Pink Beach
  - Sailing komodo trip

• UBUD (BALI)
  - Terasering Sawah Jatiluwih
  - Yoga & Meditasi alam
  - Udara pegunungan segar

• RAJA AMPAT (PAPUA)
  - Eksplorasi Wayag/Piaynemo
  - Snorkeling terumbu karang
  - Ketenangan pulau terpencil

• GUNUNG BROMO (JATIM)
  - Sunrise Penanjakan 1
  - Jeep tour lautan pasir
  - Kunjungan Pura Poten

• DANAU TOBA (SUMUT)
  - Pemandangan Pulau Samosir
  - Budaya lokal yang kental
  - Udara danau yang sejuk

• KEP. DERAWAN (KALTIM)
  - Berenang dengan Penyu
  - Danau Ubur-ubur Kakaban
  - Pasir putih Gusung Sanggalau

• YOGYAKARTA (DIY)
  - Nuansa Keraton & Malioboro
  - Kuliner Gudeg legendaris
  - Kehangatan warga lokal

==================================================
"Satu doa, sejuta langkah, selamanya bersama."
Amin ya Rabbal Alamin. 🤲✨
      </div>
      <div style={{ 
        height: '22px', 
        borderTop: '1px solid #dfdfdf', 
        background: '#f0f0f0', 
        fontSize: '11px', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 20px 0 5px',
        justifyContent: 'flex-end',
        gap: '50px',
        fontFamily: '"Segoe UI", sans-serif'
      }}>
        <div style={{ borderLeft: '1px solid #dfdfdf', paddingLeft: '10px' }}>Ln 1, Col 1</div>
        <div style={{ borderLeft: '1px solid #dfdfdf', paddingLeft: '10px' }}>100%</div>
        <div style={{ borderLeft: '1px solid #dfdfdf', paddingLeft: '10px' }}>Windows (CRLF)</div>
        <div style={{ borderLeft: '1px solid #dfdfdf', paddingLeft: '10px' }}>UTF-8</div>
      </div>
    </div>
  );
};

export default Notepad;
