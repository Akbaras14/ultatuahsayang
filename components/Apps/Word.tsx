// components/Apps/Word.tsx
import React, { useRef } from 'react';

const Word: React.FC = () => {
  const documentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!documentRef.current) return;
    
    const content = documentRef.current.innerHTML;
    const fullHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="UTF-8">
          <title>Skripsi Cinta - Akbar & Maftukah</title>
          <style>
            @page {
              size: 21cm 29.7cm;
              margin: 2.5cm 2.5cm 2.5cm 2.5cm;
            }
            body { font-family: "Times New Roman", serif; font-size: 12pt; color: #000; }
            h1 { font-size: 16pt; text-align: center; text-transform: uppercase; margin-bottom: 24pt; }
            h2 { font-size: 14pt; text-align: center; text-transform: uppercase; margin-top: 12pt; margin-bottom: 12pt; }
            p { text-align: justify; margin-bottom: 6pt; }
            ul, ol { margin-left: 36pt; }
            .heart { font-size: 36pt; text-align: center; display: block; margin: 24pt 0; color: red; }
            .cover { text-align: center; padding-top: 100pt; }
            .page-break { page-break-after: always; }
          </style>
        </head>
        <body>
          ${content.replace(/style="[^"]*"/g, (match) => {
            if (match.includes('textAlign: center') || match.includes('text-align: center')) {
              return 'style="text-align: center;"';
            }
            if (match.includes('textAlign: justify') || match.includes('text-align: justify')) {
              return 'style="text-align: justify;"';
            }
            return ''; // Strip complex React styles for clean Word export
          })}
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Skripsi_Cinta_Maftukah.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const pageStyle: React.CSSProperties = {
    width: '80%',
    minWidth: '600px',
    aspectRatio: '1 / 1.414', // A4 Proportion
    background: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    padding: '70px 80px',
    boxSizing: 'border-box',
    fontSize: '14px',
    lineHeight: '1.6',
    flexShrink: 0,
    color: '#000',
    marginBottom: '20px'
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', color: '#000', fontFamily: '"Segoe UI", "Times New Roman", serif' }}>
      {/* Word Ribbon Header */}
      <div style={{ background: '#2b579a', color: 'white', padding: '2px 10px', fontSize: '12px', display: 'flex', gap: '15px' }}>
        <span style={{ fontWeight: 'bold' }}>File</span>
        <span>Home</span>
        <span>Insert</span>
        <span>Page Layout</span>
        <span>References</span>
        <span>Mailings</span>
        <span>Review</span>
        <span>View</span>
      </div>
      
      {/* Ribbon Content Placeholder */}
      <div style={{ background: '#f3f3f3', borderBottom: '1px solid #d1d1d1', padding: '10px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div 
          onClick={handleDownload}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
        >
          <div style={{ width: '32px', height: '32px', background: '#fff', border: '1px solid #ccc', borderRadius: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>💾</div>
          <span style={{ fontSize: '10px' }}>Save</span>
        </div>
        <div style={{ borderLeft: '1px solid #ccc', height: '40px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '32px', height: '32px', background: '#fff', border: '1px solid #ccc', borderRadius: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>📋</div>
          <span style={{ fontSize: '10px' }}>Paste</span>
        </div>
        <div style={{ borderLeft: '1px solid #ccc', height: '40px' }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', width: '150px' }}>
          <select style={{ fontSize: '11px', width: '100px' }}><option>Times New Roman</option></select>
          <select style={{ fontSize: '11px', width: '40px' }}><option>12</option></select>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button style={{ fontWeight: 'bold', width: '20px', fontSize: '11px' }}>B</button>
            <button style={{ fontStyle: 'italic', width: '20px', fontSize: '11px' }}>I</button>
            <button style={{ textDecoration: 'underline', width: '20px', fontSize: '11px' }}>U</button>
          </div>
        </div>
        <div style={{ borderLeft: '1px solid #ccc', height: '40px' }}></div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <div style={{ fontSize: '20px' }}>📑</div>
          <div style={{ fontSize: '20px' }}>📊</div>
          <div style={{ fontSize: '20px' }}>🖼️</div>
        </div>
      </div>

      {/* Page Area */}
      <div ref={documentRef} style={{ flexGrow: 1, background: '#e6e6e6', padding: '30px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Page 1: Cover */}
        <div style={pageStyle}>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ fontSize: '22px', textTransform: 'uppercase', marginBottom: '60px' }}>SKRIPSI CINTA: ANALISIS KOMPREHENSIF KEBAHAGIAAN DAN UCAPAN SELAMAT ULANG TAHUN UNTUK MAFTUKAH</h1>
            <div style={{ margin: '80px 0', fontSize: '50px' }}>🎂❤️</div>
            <p style={{ fontSize: '16px', fontWeight: 'bold', maxWidth: '450px', margin: '0 auto' }}>Sebuah Persembahan Tulus, Doa yang Melangit, dan Kasih Sayang Tak Terhingga untuk Wanita Paling Istimewa di Hari Kelahirannya</p>
            <div style={{ marginTop: '150px' }}>
              <p>Peneliti / Disusun Oleh:</p>
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Akbar Aditiya Sugianto</p>
              <p>NIM: 1205-SELAMANYA-MAFTUKAH</p>
            </div>
            <div style={{ marginTop: '150px' }}>
              <p style={{ fontWeight: 'bold' }}>PROGRAM STUDI HUBUNGAN KASIH SAYANG ABADI</p>
              <p style={{ fontWeight: 'bold' }}>FAKULTAS KEBAHAGIAAN DUNIA DAN AKHIRAT</p>
              <p style={{ fontWeight: 'bold' }}>UNIVERSITAS KASIH SAYANG AKBAR & MAFTUKAH</p>
              <p style={{ fontWeight: 'bold' }}>MEI 2026</p>
            </div>
          </div>
        </div>

        {/* Page 2: BAB I */}
        <div style={pageStyle}>
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase' }}>BAB I</h2>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase', marginBottom: '40px' }}>PENDAHULUAN DAN IDENTIFIKASI SOSOK TERINDAH</h2>
            <p style={{ marginBottom: '15px' }}><strong>1.1 Latar Belakang Penulisan</strong></p>
            <p style={{ textAlign: 'justify', textIndent: '30px' }}>Penulisan skripsi ini bukan didasarkan pada keresahan akademis, melainkan pada luapan rasa syukur yang tak terhingga atas hadirnya seorang Maftukah di dunia ini. Tanggal ini bukan sekadar angka di kalender, melainkan peringatan akan lahirnya malaikat tanpa sayap yang kemudian menjadi pusat gravitasi dalam hidup Akbar Aditiya Sugianto.</p>
            <p style={{ textAlign: 'justify', textIndent: '30px', marginTop: '15px' }}>Tujuan utama dari penelitian perasaan ini adalah untuk mendokumentasikan betapa berharganya setiap detik yang dilewati bersama, dan untuk merayakan hari ulang tahun Maftukah dengan cara yang paling unik, formal, namun tetap penuh dengan kehangatan cinta.</p>
            <p style={{ marginBottom: '15px', marginTop: '30px' }}><strong>1.2 Rumusan Karakter Objek Cinta</strong></p>
            <p style={{ textAlign: 'justify', textIndent: '30px' }}>Berdasarkan hasil observasi bertahun-tahun, peneliti menemukan bahwa Maftukah memiliki indeks kebahagiaan yang sangat tinggi. Karakter utamanya meliputi:</p>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Penyebar Energi Positif:</strong> Hanya dengan kehadirannya, suasana yang mendung bisa berubah menjadi cerah seketika.</li>
              <li><strong>Ketulusan yang Langka:</strong> Di tengah dunia yang kompetitif, ia tetap menjadi sosok yang paling tulus dalam memberi tanpa pernah menagih kembali.</li>
              <li><strong>Definisi Cantik yang Sebenarnya:</strong> Cantik luar dan dalam, yang semakin bertambah seiring bertambahnya usia dan kedewasaan.</li>
            </ul>
          </div>
        </div>

        {/* Page 3: BAB II */}
        <div style={pageStyle}>
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase' }}>BAB II</h2>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase', marginBottom: '40px' }}>TINJAUAN HISTORIS DAN MILESTONE KEBERSAMAAN</h2>
            <p style={{ marginBottom: '15px' }}><strong>2.1 Dinamika Pertemuan</strong></p>
            <p style={{ textAlign: 'justify', textIndent: '30px' }}>Dalam bab ini, peneliti mencatat bahwa setiap tantangan yang kita lalui bersama adalah data valid yang membuktikan kekuatan ikatan kita. Maftukah bukan hanya seorang kekasih, tapi adalah "Tuah" sejati bagi Akbar—seorang pembawa keberuntungan dan berkah yang mengubah cara pandang Akbar terhadap dunia.</p>
            <p style={{ textAlign: 'justify', textIndent: '30px', marginTop: '15px' }}>Seiring bertambahnya usia Maftukah hari ini, peneliti melihat adanya pertumbuhan yang signifikan dalam hal kedewasaan dan kecantikan jiwa. Milestone kita bukan hanya tentang tanggal jadian, tapi tentang setiap doa yang kita aminkan bersama di tengah malam.</p>
            <p style={{ marginBottom: '15px', marginTop: '30px' }}><strong>2.2 Analisis Kebahagiaan Komprehensif</strong></p>
            <p style={{ textAlign: 'justify', textIndent: '30px' }}>Variabel independen seperti "Senyum Maftukah" memiliki korelasi positif yang sangat kuat (r=1.0) terhadap variabel dependen "Ketenteraman Hati Akbar". Peneliti menyimpulkan bahwa menjaga kebahagiaan Maftukah adalah prioritas utama dalam kurikulum kehidupan Akbar.</p>
          </div>
        </div>

        {/* Page 4: BAB III */}
        <div style={pageStyle}>
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase' }}>BAB III</h2>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase', marginBottom: '40px' }}>MANIFESTO DOA DAN UCAPAN ULANG TAHUN DARI PENELITI AKBAR</h2>
            <p style={{ textAlign: 'justify' }}>Teruntuk Maftukah, pemilik hati yang paling meneduhkan...</p>
            
            <div style={{ marginTop: '20px', padding: '15px 25px', background: '#f9f9f9', borderLeft: '5px solid #2b579a', fontStyle: 'italic' }}>
              <p style={{ marginBottom: '10px' }}>&quot;Barakallah Fii Umrik, sayangku Maftukah. Selamat ulang tahun!&quot;</p>
              <p style={{ marginBottom: '10px' }}>&quot;Hari ini adalah hari favoritku di sepanjang tahun, karena di hari inilah dunia menyambut kehadiranmu yang kelak akan menjadi bidadari bagiku. Terima kasih sudah tumbuh menjadi wanita sehebat, sekuat, dan secantik ini.&quot;</p>
              <p>&quot;Penelitian cintaku membuktikan bahwa tidak ada yang lebih indah selain melihatmu bahagia. Aku berjanji akan menjadi orang pertama yang merayakan kesuksesanmu dan orang terakhir yang meninggalkanmu saat kau kesulitan.&quot;</p>
            </div>

            <p style={{ marginTop: '30px' }}><strong>Daftar Ucapan dan Harapan Spesial:</strong></p>
            <ul style={{ marginTop: '10px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Ucapan Keberkahan:</strong> Semoga di usia yang baru ini, Allah SWT senantiasa melimpahkan rahmat-Nya padamu, memberikan kesehatan yang luar biasa, dan menjagamu dalam setiap sujudmu.</li>
              <li style={{ marginBottom: '12px' }}><strong>Ucapan Kesuksesan:</strong> Peneliti Akbar berdoa agar semua target dan mimpimu di tahun ini tercapai satu per satu. Aku akan selalu di belakangmu untuk memberikan tepuk tangan paling keras.</li>
              <li style={{ marginBottom: '12px' }}><strong>Ucapan Kesabaran:</strong> Terima kasih telah sabar menghadapi peneliti yang terkadang sulit dimengerti ini. Semoga kesabaranmu menjadi ladang pahala yang tak terputus.</li>
              <li style={{ marginBottom: '12px' }}><strong>Ucapan Kebersamaan:</strong> Semoga kita selalu diberikan jalan untuk terus merayakan ulang tahunmu bersama-sama hingga puluhan tahun ke depan, sampai rambut kita memutih dan ingatan kita hanya menyisakan nama satu sama lain.</li>
            </ul>
          </div>
        </div>

        {/* Page 5: BAB IV */}
        <div style={pageStyle}>
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase' }}>BAB IV</h2>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase', marginBottom: '40px' }}>PROYEKSI KEBAHAGIAAN DAN RENCANA ULANG TAHUN BERIKUTNYA</h2>
            <p style={{ marginBottom: '15px' }}><strong>4.1 Agenda Healing Pasca-Ulang Tahun</strong></p>
            <p style={{ textAlign: 'justify', textIndent: '30px' }}>Peneliti Akbar telah menyusun rencana strategis untuk mengajak Maftukah mengeksplorasi destinasi-destinasi impian kita. Ini adalah hadiah jangka panjang yang ingin aku berikan: dunia yang bisa kita jelajahi berdua, tangan yang saling menggenggam di setiap bandara, dan foto-foto yang akan mengisi galeri masa depan kita.</p>
            <p style={{ textAlign: 'justify', textIndent: '30px', marginTop: '15px' }}>Rencana ini meliputi kunjungan ke tempat-tempat yang tenang, agar kamu bisa beristirahat sejenak dari lelahnya dunia dan merasakan betapa luasnya kasih sayang-Nya melalui keindahan alam Indonesia.</p>
            <p style={{ marginBottom: '15px', marginTop: '30px' }}><strong>4.2 Harapan untuk Diri Sendiri (Sebagai Peneliti)</strong></p>
            <p style={{ textAlign: 'justify', textIndent: '30px' }}>Aku berharap bisa menjadi hadiah terbaik untukmu, bukan hanya hari ini, tapi setiap hari. Aku ingin menjadi alasan kenapa kamu merasa aman, alasan kenapa kamu berani bermimpi besar, dan alasan kenapa kamu tidak pernah merasa sendirian di dunia ini.</p>
          </div>
        </div>

        {/* Page 6: BAB V */}
        <div style={pageStyle}>
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase' }}>BAB V</h2>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase', marginBottom: '40px' }}>KOMITMEN JANGKA PANJANG (JANJI PENELITI)</h2>
            <p style={{ marginBottom: '15px' }}><strong>5.1 Pakta Integritas Akbar untuk Maftukah</strong></p>
            <p style={{ textAlign: 'justify', textIndent: '30px' }}>Sebagai peneliti utama dalam skripsi cinta ini, Akbar Aditiya Sugianto dengan ini berjanji di hadapan Tuhan dan di hari lahirmu yang suci ini:</p>
            <ul style={{ marginTop: '15px' }}>
              <li style={{ marginBottom: '10px' }}>Akan selalu menjaga senyummu agar tidak pernah pudar oleh air mata kesedihan.</li>
              <li style={{ marginBottom: '10px' }}>Akan terus belajar menjadi imam yang baik, yang menuntunmu ke arah surga-Nya.</li>
              <li style={{ marginBottom: '10px' }}>Akan menjadikan setiap hari sebagai hari ulang tahunmu, dengan memberikan perhatian dan kasih sayang yang tak berkurang.</li>
              <li style={{ marginBottom: '10px' }}>Akan selalu membelamu, mendukungmu, dan membanggakanmu di hadapan siapapun.</li>
            </ul>
            <p style={{ textAlign: 'justify', marginTop: '20px' }}>Janji ini adalah komitmen tertulis yang tertanam dalam sistem inti "Sistem Cinta" yang sedang kita bangun bersama.</p>
          </div>
        </div>

        {/* Page 7: BAB VI */}
        <div style={pageStyle}>
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase' }}>BAB VI</h2>
            <h2 style={{ textAlign: 'center', fontSize: '18px', textTransform: 'uppercase', marginBottom: '40px' }}>PENUTUP DAN KESIMPULAN AKHIR</h2>
            <p style={{ marginBottom: '15px' }}><strong>6.1 Kesimpulan Penelitian Hati</strong></p>
            <p style={{ textAlign: 'justify' }}>Dari seluruh halaman skripsi ini, hanya ada satu kesimpulan yang valid dan tidak bisa diganggu gugat:</p>
            <p style={{ textAlign: 'center', marginTop: '30px', fontWeight: 'bold', fontSize: '20px', color: '#2b579a' }}>&quot;SELAMAT ULANG TAHUN, MAFTUKAH SAYANG. AKU MENCINTAIMU LEBIH DARI APAPUN.&quot;</p>
            <p style={{ marginBottom: '15px', marginTop: '50px' }}><strong>6.2 Saran Jangka Panjang</strong></p>
            <p style={{ textAlign: 'justify' }}>Disarankan agar Maftukah tidak pernah ragu akan kasih sayang peneliti Akbar, karena setiap baris kode dan setiap bait doa ini adalah bukti nyata dari pengabdian cinta yang tulus.</p>
          </div>

          <div style={{ marginTop: '150px', textAlign: 'right' }}>
            <p>Teriring salam sayang yang paling dalam,</p>
            <br /><br /><br />
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Akbar Aditiya Sugianto</p>
            <p>Peneliti & Pasangan Setiamu</p>
          </div>
        </div>

      </div>

      {/* Status Bar */}
      <div style={{ background: '#2b579a', color: 'white', padding: '2px 10px', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
        <div>Page 1 of 7 | 1,850 words | Indonesian</div>
        <div>100% [ - | + ]</div>
      </div>
    </div>
  );
};

export default Word;
