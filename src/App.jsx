import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, BookOpen, Award, PenLine, Link as LinkIcon } from "lucide-react";

const mcqQuestions = [
  {
    no: 1,
    level: "C1",
    materi: "Jujur",
    question: "Apa pengertian jujur yang paling tepat?",
    options: [
      "Mengatakan dan melakukan sesuatu sesuai kenyataan",
      "Menyembunyikan kesalahan agar tidak dimarahi",
      "Berbicara baik hanya kepada teman dekat",
      "Melakukan sesuatu agar dipuji orang lain",
    ],
    answer: 0,
    explanation: "Jujur berarti berkata benar dan bertindak sesuai fakta atau kenyataan.",
  },
  {
    no: 2,
    level: "C2",
    materi: "Jujur",
    question: "Contoh perilaku jujur di sekolah adalah ....",
    options: [
      "Mencontek saat ujian agar mendapat nilai tinggi",
      "Mengakui kesalahan ketika merusakkan barang teman",
      "Menyalahkan orang lain agar bebas hukuman",
      "Mengubah nilai tugas tanpa izin guru",
    ],
    answer: 1,
    explanation: "Mengakui kesalahan adalah contoh sikap jujur karena tidak menyembunyikan kebenaran.",
  },
  {
    no: 3,
    level: "C2",
    materi: "Jujur",
    question: "Manfaat utama dari perilaku jujur adalah ....",
    options: [
      "Mendapat kepercayaan dari orang lain",
      "Selalu mendapat hadiah dari guru",
      "Bebas melakukan apa saja",
      "Menjadi orang yang ditakuti",
    ],
    answer: 0,
    explanation: "Orang yang jujur biasanya dipercaya karena perkataan dan perbuatannya dapat diandalkan.",
  },
  {
    no: 4,
    level: "C2",
    materi: "Jujur",
    question: "QS. At-Taubah ayat 119 memerintahkan orang beriman agar bertakwa kepada Allah dan ....",
    options: [
      "Bersama orang-orang yang jujur",
      "Menjauhi semua manusia",
      "Mengumpulkan harta sebanyak-banyaknya",
      "Berdiam diri sepanjang waktu",
    ],
    answer: 0,
    explanation: "Kandungan QS. At-Taubah:119 adalah perintah bertakwa dan bersama orang-orang yang benar/jujur.",
  },
  {
    no: 5,
    level: "C1",
    materi: "Ikhlas",
    question: "Ikhlas berarti melakukan amal perbuatan karena ....",
    options: [
      "Ingin dipuji teman",
      "Takut kepada manusia",
      "Mencari ridha Allah Swt.",
      "Agar terlihat hebat di media sosial",
    ],
    answer: 2,
    explanation: "Ikhlas adalah beramal semata-mata karena Allah Swt., bukan karena pujian manusia.",
  },
  {
    no: 6,
    level: "C2",
    materi: "Ikhlas",
    question: "Contoh perilaku ikhlas adalah ....",
    options: [
      "Bersedekah lalu menceritakannya agar dipuji",
      "Membantu teman tanpa mengharapkan balasan",
      "Belajar hanya saat dilihat guru",
      "Beribadah agar dianggap paling saleh",
    ],
    answer: 1,
    explanation: "Membantu tanpa mengharap imbalan menunjukkan sikap ikhlas.",
  },
  {
    no: 7,
    level: "C2",
    materi: "Ikhlas",
    question: "Salah satu manfaat sikap ikhlas adalah ....",
    options: [
      "Hati menjadi lebih tenang",
      "Mudah menyombongkan diri",
      "Selalu ingin dikenal orang",
      "Membuat orang lain takut",
    ],
    answer: 0,
    explanation: "Orang yang ikhlas tidak terlalu bergantung pada pujian, sehingga hatinya lebih tenang.",
  },
  {
    no: 8,
    level: "C2",
    materi: "Ikhlas",
    question: "Hadis 'Sesungguhnya amal itu tergantung niatnya' berkaitan erat dengan sikap ....",
    options: [
      "Zuhud",
      "Ikhlas",
      "Sombong",
      "Boros",
    ],
    answer: 1,
    explanation: "Hadis tentang niat menunjukkan bahwa nilai amal bergantung pada niat, sehingga berhubungan dengan ikhlas.",
  },
  {
    no: 9,
    level: "C1",
    materi: "Zuhud",
    question: "Pengertian zuhud yang paling tepat adalah ....",
    options: [
      "Membenci semua harta dan tidak mau bekerja",
      "Hidup sederhana dan tidak berlebihan mencintai dunia",
      "Mengumpulkan harta sebanyak-banyaknya",
      "Tidak peduli kepada keluarga",
    ],
    answer: 1,
    explanation: "Zuhud bukan berarti meninggalkan dunia sepenuhnya, tetapi tidak menjadikan dunia sebagai tujuan utama.",
  },
  {
    no: 10,
    level: "C2",
    materi: "Zuhud",
    question: "Contoh perilaku zuhud dalam kehidupan sehari-hari adalah ....",
    options: [
      "Membeli barang hanya untuk pamer",
      "Menggunakan harta secukupnya dan tidak berlebihan",
      "Menghina orang miskin",
      "Malas bekerja karena merasa dunia tidak penting",
    ],
    answer: 1,
    explanation: "Zuhud tampak pada sikap sederhana, tidak boros, dan tidak menjadikan harta sebagai kebanggaan utama.",
  },
  {
    no: 11,
    level: "C2",
    materi: "Zuhud",
    question: "Hikmah hidup zuhud adalah ....",
    options: [
      "Terhindar dari sifat tamak terhadap dunia",
      "Menjadi malas berusaha",
      "Selalu ingin dipuji orang",
      "Mudah meremehkan orang lain",
    ],
    answer: 0,
    explanation: "Zuhud membantu seseorang mengendalikan keinginan duniawi dan menjauhi sifat tamak.",
  },
  {
    no: 12,
    level: "C1",
    materi: "Pernikahan",
    question: "Salah satu tujuan pernikahan menurut QS. Ar-Rum ayat 21 adalah ....",
    options: [
      "Agar manusia saling membanggakan harta",
      "Agar suami istri merasa tenteram",
      "Agar manusia bebas dari tanggung jawab",
      "Agar keluarga hidup tanpa aturan",
    ],
    answer: 1,
    explanation: "QS. Ar-Rum:21 menjelaskan bahwa Allah menciptakan pasangan agar manusia merasa tenteram kepadanya.",
  },
  {
    no: 13,
    level: "C2",
    materi: "Pernikahan",
    question: "Hukum menikah dapat menjadi wajib apabila seseorang ....",
    options: [
      "Tidak memiliki keinginan menikah sama sekali",
      "Mampu menikah dan dikhawatirkan terjerumus pada zina",
      "Ingin menikah hanya untuk pamer",
      "Belum siap lahir dan batin",
    ],
    answer: 1,
    explanation: "Menikah dapat menjadi wajib jika seseorang mampu dan khawatir jatuh pada perbuatan zina.",
  },
  {
    no: 14,
    level: "C2",
    materi: "Pernikahan",
    question: "Yang termasuk rukun nikah adalah ....",
    options: [
      "Calon suami, calon istri, wali, dua saksi, dan ijab kabul",
      "Gedung, dekorasi, undangan, dan dokumentasi",
      "Mahar mahal, pesta besar, dan hiburan",
      "Restu teman, hadiah, dan pakaian mewah",
    ],
    answer: 0,
    explanation: "Rukun nikah meliputi calon suami, calon istri, wali, dua orang saksi, dan ijab kabul.",
  },
  {
    no: 15,
    level: "C1",
    materi: "Tokoh Pembaru Islam Indonesia",
    question: "Tokoh pembaru Islam Indonesia yang dikenal sebagai pendiri Muhammadiyah adalah ....",
    options: [
      "Ahmad Dahlan",
      "Hasyim Asy'ari",
      "Harun Nasution",
      "Nurcholish Madjid",
    ],
    answer: 0,
    explanation: "Ahmad Dahlan dikenal sebagai pendiri Muhammadiyah dan pembaru pendidikan Islam.",
  },
];

const matchingQuestions = [
  {
    no: 16,
    title: "Jodohkan ayat dengan kandungannya",
    left: ["QS. At-Taubah:119", "QS. Ar-Rum:21"],
    right: ["Perintah bertakwa dan bersama orang jujur", "Allah menciptakan pasangan agar manusia tenteram", "Larangan menyia-nyiakan waktu"],
    answer: { 0: 0, 1: 1 },
  },
  {
    no: 17,
    title: "Jodohkan hadis dengan perilakunya",
    left: ["Innamal a'malu binniyat", "Izhad fid-dunya yuhibbukallah"],
    right: ["Beramal karena Allah, bukan karena pujian", "Hidup sederhana dan tidak berlebihan mencintai dunia", "Berbicara kasar kepada teman"],
    answer: { 0: 0, 1: 1 },
  },
  {
    no: 18,
    title: "Jodohkan tokoh dengan jasanya",
    left: ["Ahmad Dahlan", "Hasyim Asy'ari", "Mohammad Natsir", "Harun Nasution", "Nurcholish Madjid"],
    right: ["Pembaruan pendidikan Islam", "Mengembangkan pesantren", "Mengembangkan dakwah modern", "Pembaruan pemikiran Islam", "Pembaruan pemikiran Islam modern"],
    answer: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
  },
  {
    no: 19,
    title: "Jodohkan istilah nikah dengan pengertiannya",
    left: ["Wali", "Saksi", "Ijab kabul", "Mahar"],
    right: ["Pihak yang menikahkan mempelai perempuan", "Orang yang menyaksikan akad nikah", "Ucapan serah terima dalam akad nikah", "Pemberian wajib dari calon suami kepada calon istri"],
    answer: { 0: 0, 1: 1, 2: 2, 3: 3 },
  },
  {
    no: 20,
    title: "Jodohkan perilaku dengan sikapnya",
    left: ["Mengembalikan uang lebih saat membeli", "Membantu teman tanpa mengharap balasan", "Tidak boros walaupun memiliki uang"],
    right: ["Jujur", "Ikhlas", "Zuhud", "Riya"],
    answer: { 0: 0, 1: 1, 2: 2 },
  },
];

const essayQuestions = [
  {
    no: 21,
    materi: "Jujur",
    question: "Tuliskan QS. At-Taubah ayat 119 beserta artinya secara singkat!",
    key: "Inti jawaban: wahai orang-orang beriman, bertakwalah kepada Allah dan bersamalah dengan orang-orang yang jujur/benar.",
  },
  {
    no: 22,
    materi: "Ikhlas",
    question: "Jelaskan pengertian ikhlas dengan bahasamu sendiri!",
    key: "Ikhlas adalah melakukan amal atau kebaikan semata-mata karena Allah Swt., bukan karena pujian, hadiah, atau balasan manusia.",
  },
  {
    no: 23,
    materi: "Zuhud",
    question: "Sebutkan dua contoh perilaku zuhud dalam kehidupan sehari-hari!",
    key: "Contoh: hidup sederhana, tidak boros, menggunakan harta untuk kebaikan, tidak pamer barang mahal, tetap rajin beribadah meskipun sibuk urusan dunia.",
  },
  {
    no: 24,
    materi: "Pernikahan",
    question: "Sebutkan rukun nikah dalam Islam!",
    key: "Calon suami, calon istri, wali, dua orang saksi, dan ijab kabul.",
  },
  {
    no: 25,
    materi: "Tokoh Pembaru Islam Indonesia",
    question: "Sebutkan minimal tiga tokoh pembaru Islam Indonesia!",
    key: "Contoh: Ahmad Dahlan, Hasyim Asy'ari, Mohammad Natsir, Harun Nasution, Nurcholish Madjid.",
  },
];

function ScoreBadge({ score, total }) {
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);
  return (
    <div className="flex w-full min-w-0 items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:w-auto md:min-w-64">
      <div className="shrink-0 rounded-full bg-slate-100 p-3">
        <Award className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500">Nilai otomatis</p>
        <p className="text-xl font-bold text-slate-900 sm:text-2xl">{score}/{total} <span className="text-sm font-semibold text-slate-500 sm:text-base">({percentage}%)</span></p>
      </div>
    </div>
  );
}

export default function LatihanSoalPaiInteraktif() {
  const [answers, setAnswers] = useState({});
  const [matchAnswers, setMatchAnswers] = useState({});
  const [essays, setEssays] = useState({});
  const [showResult, setShowResult] = useState(false);

  const mcqScore = useMemo(() => {
    return mcqQuestions.reduce((total, q) => total + (answers[q.no] === q.answer ? 1 : 0), 0);
  }, [answers]);

  const matchingScore = useMemo(() => {
    return matchingQuestions.reduce((total, q) => {
      const current = matchAnswers[q.no] || {};
      const allCorrect = Object.entries(q.answer).every(([leftIndex, rightIndex]) => Number(current[leftIndex]) === rightIndex);
      return total + (allCorrect ? 1 : 0);
    }, 0);
  }, [matchAnswers]);

  const totalAuto = mcqQuestions.length + matchingQuestions.length;
  const autoScore = mcqScore + matchingScore;

  function resetAll() {
    setAnswers({});
    setMatchAnswers({});
    setEssays({});
    setShowResult(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-4 text-slate-900 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:gap-8">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                <BookOpen className="h-4 w-4" /> PAI BP Kelas 11
              </div>
              <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Latihan Soal Interaktif Sesuai Kisi-Kisi</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Materi: jujur, ikhlas, zuhud, pernikahan, ayat Al-Qur'an, hadis, akhlak terpuji, dan tokoh pembaru Islam Indonesia. Pilihan ganda dan pencocokan dinilai otomatis, sedangkan essay dapat dicek dengan kunci jawaban.</p>
            </div>
            <ScoreBadge score={autoScore} total={totalAuto} />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button onClick={() => setShowResult(true)} className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700 sm:w-auto sm:rounded-2xl">Cek Jawaban</button>
            <button onClick={resetAll} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm ring-1 ring-slate-300 transition hover:bg-slate-100 sm:w-auto sm:rounded-2xl"><RotateCcw className="h-4 w-4" /> Ulangi</button>
          </div>
        </motion.section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold sm:text-2xl">A. Pilihan Ganda</h2>
          {mcqQuestions.map((q) => {
            const selected = answers[q.no];
            const isCorrect = selected === q.answer;
            return (
              <div key={q.no} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white">No. {q.no}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{q.materi}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{q.level}</span>
                </div>
                <p className="mb-4 break-words text-base font-semibold leading-7 sm:text-lg">{q.question}</p>
                <div className="grid gap-3">
                  {q.options.map((option, index) => {
                    const chosen = selected === index;
                    const correctOption = showResult && index === q.answer;
                    const wrongChosen = showResult && chosen && index !== q.answer;
                    return (
                      <button key={option} onClick={() => setAnswers({ ...answers, [q.no]: index })} className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-3 text-left leading-6 transition sm:p-4 ${chosen ? "border-slate-900 bg-slate-100" : "border-slate-200 bg-white hover:bg-slate-50"} ${correctOption ? "border-green-500 bg-green-50" : ""} ${wrongChosen ? "border-red-500 bg-red-50" : ""}`}>
                        <span className="min-w-0 break-words"><b>{String.fromCharCode(65 + index)}.</b> {option}</span>
                        {showResult && correctOption && <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />}
                        {showResult && wrongChosen && <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
                {showResult && (
                  <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 sm:text-base ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                    <b>{isCorrect ? "Benar." : "Belum tepat."}</b> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl"><LinkIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" /> <span className="min-w-0 break-words">B. Menjodohkan / Pencocokan</span></h2>
          {matchingQuestions.map((q) => {
            const current = matchAnswers[q.no] || {};
            const allCorrect = Object.entries(q.answer).every(([leftIndex, rightIndex]) => Number(current[leftIndex]) === rightIndex);
            return (
              <div key={q.no} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white">No. {q.no}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">C2</span>
                </div>
                <p className="mb-4 break-words text-base font-semibold leading-7 sm:text-lg">{q.title}</p>
                <div className="space-y-3">
                  {q.left.map((leftItem, leftIndex) => {
                    const selectedRight = current[leftIndex];
                    const correct = showResult && Number(selectedRight) === q.answer[leftIndex];
                    const wrong = showResult && selectedRight !== undefined && Number(selectedRight) !== q.answer[leftIndex];
                    return (
                      <div key={leftItem} className={`grid gap-3 rounded-2xl border p-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:p-4 ${correct ? "border-green-500 bg-green-50" : wrong ? "border-red-500 bg-red-50" : "border-slate-200 bg-white"}`}>
                        <div className="min-w-0 break-words font-semibold leading-6">{leftItem}</div>
                        <select value={selectedRight ?? ""} onChange={(e) => setMatchAnswers({ ...matchAnswers, [q.no]: { ...current, [leftIndex]: Number(e.target.value) } })} className="min-w-0 rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 sm:text-base">
                          <option value="" disabled>Pilih pasangan jawaban</option>
                          {q.right.map((rightItem, rightIndex) => <option key={rightItem} value={rightIndex}>{rightItem}</option>)}
                        </select>
                      </div>
                    );
                  })}
                </div>
                {showResult && (
                  <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 sm:text-base ${allCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                    <b>{allCorrect ? "Semua pasangan benar." : "Masih ada pasangan yang salah."}</b>
                    <div className="mt-2 break-words text-sm">
                      Kunci: {q.left.map((leftItem, index) => `${leftItem} = ${q.right[q.answer[index]]}`).join("; ")}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl"><PenLine className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" /> <span className="min-w-0 break-words">C. Essay / Isian Singkat</span></h2>
          {essayQuestions.map((q) => (
            <div key={q.no} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white">No. {q.no}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{q.materi}</span>
              </div>
              <p className="mb-4 break-words text-base font-semibold leading-7 sm:text-lg">{q.question}</p>
              <textarea value={essays[q.no] || ""} onChange={(e) => setEssays({ ...essays, [q.no]: e.target.value })} placeholder="Tulis jawabanmu di sini..." className="min-h-28 w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 sm:p-4 sm:text-base" />
              {showResult && (
                <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 sm:text-base">
                  <b>Kunci/pedoman jawaban:</b> {q.key}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
