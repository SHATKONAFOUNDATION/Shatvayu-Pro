
export default function LandingPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', color: '#333' }}>
      {/* HERO: Global Pain Free Living Mission */}
      <section style={{ padding: '50px', textAlign: 'center', background: '#f4f4f4' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Global Pain Free Living Mission</h1>
        <p style={{ fontSize: '1.2rem' }}>A visionary initiative by Shatkona Foundation.</p>
        <button style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>
          Join the Mission
        </button>
      </section>

      {/* THEORY: The Science of Fascia */}
      <section style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>The Theory of the Shatkona Protocol</h2>
        <p>
          Our protocol is built on the science of Myofascial Pain Syndrome (MPS). 
          By understanding the <strong>Six Pillars</strong>, we bridge the gap between 
          vagal toning, brainwave shifts, and physical liberation.
        </p>
        <p><em>Practice (30-min Flow & Videos) is available exclusively in the mobile app for subscribers.</em></p>
      </section>

      {/* THE 6 PILLARS GRID */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '40px' }}>
        <div style={cardStyle}><h3>Prana Pulse</h3><p>ANS Regulation</p></div>
        <div style={cardStyle}><h3>Chakra Balance</h3><p>CSF Flow</p></div>
        <div style={cardStyle}><h3>Yogasana</h3><p>Fascia Stretch</p></div>
        <div style={cardStyle}><h3>Myofascial Liberation</h3><p>Trigger Release</p></div>
        <div style={cardStyle}><h3>Yoga Nidra</h3><p>Neuroplasticity</p></div>
        <div style={cardStyle}><h3>Vow of Mastery</h3><p>6-Day Commitment</p></div>
      </section>

      {/* CALL TO ACTION: Redirect to App */}
      <section style={{ textAlign: 'center', padding: '50px' }}>
        <button 
          onClick={() => window.location.href = 'fasciamax://login'}
          style={{ padding: '15px 30px', background: '#D4AF37', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          LOG IN TO START 30-MIN RITUAL
        </button>
      </section>
    </main>
  );
}

const cardStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center' as const,
};