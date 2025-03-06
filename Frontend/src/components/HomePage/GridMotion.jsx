import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';
import a1 from '../../assets/Images/ad1.webp';
import d2 from '../../assets/Images/ad2.jpg';
import d3 from '../../assets/Images/ad3.jpg';
import d4 from '../../assets/Images/ad4.jpg';
import d5 from '../../assets/Images/ad5.jpg';
import d6 from '../../assets/Images/ad6.jpg';
import d7 from '../../assets/Images/ad7.jpg';

const imageArray = [a1, d2,d3, d4, d5, d6, d7];
const ad1 = new URL('../../assets/Images/ad1.webp', import.meta.url).href;
const ad2 = new URL('../../assets/Images/ad2.jpg', import.meta.url).href;
const ad3 = new URL('../../assets/Images/ad3.jpg', import.meta.url).href;
const ad4 = new URL('../../assets/Images/ad4.jpg', import.meta.url).href;
const ad5 = new URL('../../assets/Images/ad5.jpg', import.meta.url).href;
const ad6 = new URL('../../assets/Images/ad6.jpg', import.meta.url).href;
const ad7 = new URL('../../assets/Images/ad7.jpg', import.meta.url).href;

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(window.innerWidth / 2);

  // Ensure the grid has 28 items (4 rows x 7 columns) by default
  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => imageArray[index % imageArray.length]); // Repeat images
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div className="noscroll loading" ref={gridRef}>
      <section
        className="intro"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="row" ref={(el) => (rowRefs.current[rowIndex] = el)}>
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];

                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner" style={{ backgroundColor: '#111' }}>
                    {typeof content === 'string' && (content.startsWith('http') || content.includes('.')) ? (

                        // If the content is an image URL
                        <div
                          className="row__item-img"
                          style={{
                            backgroundImage: `url(${String(content)})`,

                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        ></div>
                      ) : typeof content === 'object' ? (
                        // If the content is JSX (e.g., <div>Custom JSX Content</div>)
                        <div className="row__item-content">{content}</div>
                      ) : (
                        // If the content is a string (text content)
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;
