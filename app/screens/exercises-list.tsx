import React, { useState } from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const ArrowLeft: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 12H6" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const Play: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M5 3v18l15-9-15-9z" />
  </svg>
);

interface Exercise {
  id: number;
  name: string;
  illustration: string;
  duration: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface ExerciseCategory {
  title: string;
  headerImage: string;
  list: Exercise[];
}

const ExerciseList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Cargar fuente Poppins
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const categories: Category[] = [
    {
      id: "back",
      name: "back",
      image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=400&h=500&fit=crop",
    },
    {
      id: "cardio",
      name: "cardio",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=500&fit=crop",
    },
    {
      id: "chest",
      name: "chest",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop",
    },
    {
      id: "legs",
      name: "legs",
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=500&fit=crop",
    },
    {
      id: "abs",
      name: "abs",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    },
    {
      id: "arms",
      name: "arms",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=500&fit=crop",
    },
  ];

  const exercises: Record<string, ExerciseCategory> = {
    back: {
      title: "back exercises",
      headerImage: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&h=400&fit=crop",
      list: [
        {
          id: 1,
          name: "pull up",
          illustration: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop",
          duration: "0:16",
        },
        {
          id: 2,
          name: "chin up",
          illustration: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=300&fit=crop",
          duration: "0:14",
        },
        {
          id: 3,
          name: "bent over row",
          illustration: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=300&fit=crop",
          duration: "0:18",
        },
        {
          id: 4,
          name: "lat pulldown",
          illustration: "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=300&h=300&fit=crop",
          duration: "0:15",
        },
      ],
    },
    cardio: {
      title: "cardio exercises",
      headerImage: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=400&fit=crop",
      list: [
        {
          id: 5,
          name: "jumping jacks",
          illustration: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=300&h=300&fit=crop",
          duration: "0:20",
        },
        {
          id: 6,
          name: "burpees",
          illustration: "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=300&h=300&fit=crop",
          duration: "0:25",
        },
        {
          id: 7,
          name: "mountain climbers",
          illustration: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop",
          duration: "0:18",
        },
        {
          id: 8,
          name: "high knees",
          illustration: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
          duration: "0:16",
        },
      ],
    },
    chest: {
      title: "chest exercises",
      headerImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
      list: [
        {
          id: 9,
          name: "bench press",
          illustration: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=300&h=300&fit=crop",
          duration: "0:20",
        },
        {
          id: 10,
          name: "push ups",
          illustration: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=300&h=300&fit=crop",
          duration: "0:15",
        },
        {
          id: 11,
          name: "dumbbell flyes",
          illustration: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
          duration: "0:17",
        },
        {
          id: 12,
          name: "chest dips",
          illustration: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop",
          duration: "0:14",
        },
      ],
    },
    arms: {
      title: "arms exercises",
      headerImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=400&fit=crop",
      list: [
        {
          id: 13,
          name: "bicep curls",
          illustration: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop",
          duration: "0:15",
        },
        {
          id: 14,
          name: "tricep dips",
          illustration: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=300&h=300&fit=crop",
          duration: "0:16",
        },
        {
          id: 15,
          name: "hammer curls",
          illustration: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=300&fit=crop",
          duration: "0:14",
        },
        {
          id: 16,
          name: "overhead extension",
          illustration: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop",
          duration: "0:18",
        },
      ],
    },
    legs: {
      title: "legs exercises",
      headerImage: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=400&fit=crop",
      list: [
        {
          id: 17,
          name: "squats",
          illustration: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=300&fit=crop",
          duration: "0:20",
        },
        {
          id: 18,
          name: "lunges",
          illustration: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
          duration: "0:18",
        },
        {
          id: 19,
          name: "leg press",
          illustration: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop",
          duration: "0:22",
        },
        {
          id: 20,
          name: "calf raises",
          illustration: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop",
          duration: "0:12",
        },
      ],
    },
    abs: {
      title: "abs exercises",
      headerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      list: [
        {
          id: 21,
          name: "crunches",
          illustration: "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=300&h=300&fit=crop",
          duration: "0:15",
        },
        {
          id: 22,
          name: "plank",
          illustration: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop",
          duration: "0:30",
        },
        {
          id: 23,
          name: "leg raises",
          illustration: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
          duration: "0:16",
        },
        {
          id: 24,
          name: "bicycle crunches",
          illustration: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop",
          duration: "0:18",
        },
      ],
    },
  };

  // Vista de lista de ejercicios de una categoría
  if (selectedCategory) {
    const categoryData = exercises[selectedCategory];

    return (
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'auto',
        backgroundColor: '#000000ff',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {/* Header with Image */}
        <div style={{ position: 'relative', height: '192px', flexShrink: 0 }}>
          <img 
            src={categoryData.headerImage}
            alt={categoryData.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3), #030712)'
          }}></div>
          
          {/* Back Button */}
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <ArrowLeft size={20} style={{ color: 'white' }} />
          </button>

          {/* Title */}
          <div style={{ 
            position: 'absolute', 
            bottom: '16px', 
            left: '20px', 
            right: '20px',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', textTransform: 'lowercase', margin: 0 }}>
              {categoryData.title}
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '4px', fontWeight: '400' }}>
              {categoryData.list.length} ejercicios
            </p>
          </div>
        </div>

        {/* Exercise List */}
        <div style={{ padding: '24px 20px 96px' }}>
          {categoryData.list.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              style={{
                position: 'relative',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid #FFC107',
                marginBottom: '16px',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px' }}>
                {/* Exercise Image */}
                <div style={{ 
                  position: 'relative', 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img 
                    src={exercise.illustration}
                    alt={exercise.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                  }}></div>
                  
                  {/* Play Button */}
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: 'rgba(234, 179, 8, 0.9)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                    }}>
                      <Play size={12} style={{ color: 'black', marginLeft: '2px' }} />
                    </div>
                  </div>
                </div>

                {/* Exercise Info */}
                <div style={{ flex: 1, color: 'white' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    textTransform: 'lowercase',
                    margin: '0 0 4px 0'
                  }}>
                    {exercise.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      backgroundColor: '#000000ff',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#9ca3af',
                      fontWeight: '400'
                    }}>
                      {exercise.duration}
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <div style={{ color: '#000000ff' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista principal de categorías
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto',
      backgroundColor: '#000000ff',
      color: 'white',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Header */}
      <div style={{ padding: '32px 20px 24px', flexShrink: 0 }}>
        <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0 0 4px 0' }}>Exercises</h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0, fontWeight: '400' }}>
          Selecciona una categoría para comenzar
        </p>
      </div>

      {/* Categories Grid */}
      <div style={{ 
        padding: '0 20px 96px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              position: 'relative',
              height: '250px',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            {/* Background Image */}
            <img 
              src={category.image}
              alt={category.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            {/* Dark Overlay */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)'
            }}></div>
            
            {/* Category Name */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: 'white', 
                textTransform: 'lowercase',
                margin: 0
              }}>
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;