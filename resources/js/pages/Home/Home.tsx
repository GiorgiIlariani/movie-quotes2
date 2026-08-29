import { useScroll } from 'framer-motion';
import { useRef } from 'react';

import cover1 from '@/images/HomeCover_1.png';
import cover2 from '@/images/HomeCover_2.png';
import cover3 from '@/images/HomeCover_3.png';
import CurtainPanel from './components/CurtainPanel';
import Footer from './components/Footer';
import MainCurtain from './components/MainCurtain';
import Navbar from './components/Navbar';

// Temporary data
const covers = [
    {
        src: cover1,
        alt: 'Father and daughter under a star-filled night sky',
        lines: [
            '— Love is the one thing',
            "we're capable of perceiving",
            'that transcends time and space',
        ],
        attribution: 'Interstellar, 2014',
    },
    {
        src: cover2,
        alt: 'Two people seated on a gold couch against a pink wall',
        lines: [
            "— I think we're just gonna have",
            'to be secretly in love with each other',
            'and leave it at that',
        ],
        attribution: 'The Royal Tenenbaums, 2001',
    },
    {
        src: cover3,
        alt: 'Warriors assembled under a golden sky',
        lines: [
            '— I will not say: do not weep',
            'for not all tears are an evil',
        ],
        attribution: 'The Lord of the Rings, 2003',
    },
];

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const panelSpan = 1 / covers.length;

    return (
        <>
            <Navbar />
            <main ref={containerRef} className="h-[500dvh] bg-black">
                <div className="sticky top-0 grid h-dvh overflow-hidden bg-black">
                    <MainCurtain />
                    {covers.map((cover, index) => {
                        const start = index * panelSpan;
                        const end = start + panelSpan;

                        return (
                            <CurtainPanel
                                key={cover.src}
                                src={cover.src}
                                alt={cover.alt}
                                attribution={cover.attribution}
                                lines={cover.lines}
                                progress={scrollYProgress}
                                start={start}
                                end={end}
                            />
                        );
                    })}
                </div>
            </main>
            <Footer />
        </>
    );
}
