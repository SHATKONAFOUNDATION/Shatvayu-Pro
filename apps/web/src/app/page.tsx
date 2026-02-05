"use client";

export default function LandingPage() {
  const handleAppRedirect = () => {
    // This tries to open the app. If it fails (like on a PC), 
    // it will stay on the page.
    window.location.href = 'fasciamax://player?id=daily';
    
    // Fallback for Desktop users
    setTimeout(() => {
      if (document.hasFocus()) {
        alert("Mobile app not detected. Please scan the QR code on your phone to start the ritual!");
      }
    }, 2000);
  };

  return (
    <main style={{ backgroundColor: '#06010e', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* HERO SECTION */}
      <section style={{ padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid #1a1a1a' }}>
        <h1 style={{ fontSize: '3rem', color: '#fbbf24', letterSpacing: '3px', fontWeight: '900' }}>
          GLOBAL PAIN FREE LIVING MISSION
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '700px', margin: '20px auto' }}>
          A visionary initiative by Shatvayu Global Foundation to liberate the world from chronic pain through the Snayu-Matrix.
        </p>
      </section>

      {/* THE 6 PILLARS GRID */}
      <section style={{ padding: '60px 25px' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '40px', letterSpacing: '1px' }}>THE SHATKONA PROTOCOL</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { title: 'Prana Pulse', desc: 'ANS Regulation & Vagal Toning' },
            { title: 'Myofascial Liberation', desc: 'Trigger Point & Snayu Release' },
            { title: 'Yogasana', desc: 'Fascial Stretch & Structural Alignment' },
            { title: 'Strength & Stabilization', desc: 'Integrity for the Snayu-Matrix' },
            { title: 'Chakra Balance', desc: 'Vertical CSF Flow Optimization' },
            { title: 'Yoga Nidra & Vow of Mastery', desc: 'Neuroplasticity & Brain Reprogramming' }
          ].map((pillar, i) => (
            <div key={i} style={cardStyle}>
              <h3 style={{ color: '#fbbf24', fontSize: '1.2rem' }}>{pillar.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '10px' }}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#04011c' }}>
        <button 
          onClick={handleAppRedirect}
          style={{ 
            padding: '20px 40px', 
            background: '#fbbf24', 
            color: '#000', 
            border: 'none', 
            borderRadius: '12px', 
            fontWeight: '900', 
            fontSize: '1.1rem',
            cursor: 'pointer',
            letterSpacing: '1px'
          }}
        >
          LOG IN TO START
        </button>
        <p style={{ color: '#475569', marginTop: '20px', fontSize: '0.8rem' }}>
          © 2026 FASCIAMAX | SHATVAYU FOUNDATION
        </p>
      </section>
    </main>
  );
}

const cardStyle = {
  padding: '30px',
  backgroundColor: '#130123',
  border: '1px solid #080808',
  borderRadius: '15px',
  textAlign: 'center' as const,
};