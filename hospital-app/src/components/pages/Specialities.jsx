import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Specialities() {
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/specialities')
      .then(res => {
        setSpecialities(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching specialities:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading specialities...</div>;
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#1a1a2e' }}>
        Our Specialities
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Expert care across multiple medical disciplines
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        {specialities.map(speciality => (
          <div 
            key={speciality.id} 
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '15px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>
              {speciality.icon}
            </div>
            <h3 style={{ color: '#16b3ff', marginBottom: '15px', fontSize: '24px' }}>
              {speciality.name}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {speciality.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}